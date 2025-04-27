// src/lib/actions.js
'use server';

import { auth } from '@clerk/nextjs/server';
import { prisma } from './prisma';

export async function getCurrentUser() {
  const { userId } = await auth();
  
  if (!userId) {
    return null;
  }
  
  try {
    const dbUser = await prisma.user.findUnique({
      where: { clerkId: userId },
    });
    
    return dbUser;
  } catch (error) {
    console.error('Error fetching user:', error);
    return null;
  }
}

export async function getUserClaims() {
  const { userId } = await auth();
  
  if (!userId) {
    return [];
  }
  
  try {
    const dbUser = await prisma.user.findUnique({
      where: { clerkId: userId },
    });
    
    if (!dbUser) {
      return [];
    }
    
    const claims = await prisma.claim.findMany({
      where: { userId: dbUser.id },
      include: { lender: true },
      orderBy: { updatedAt: 'desc' },
    });
    
    return claims;
  } catch (error) {
    console.error('Error fetching claims:', error);
    return [];
  }
}
// src/lib/actions.js (continued)

export async function createNewClaim(formData) {
    'use server';
    
    const { userId } = await auth();
    
    if (!userId) {
      return { success: false, error: 'Authentication required' };
    }
    
    const lenderId = formData.get('lenderId');
    
    if (!lenderId) {
      return { success: false, error: 'Lender is required' };
    }
    
    try {
      const dbUser = await prisma.user.findUnique({
        where: { clerkId: userId },
      });
      
      if (!dbUser) {
        return { success: false, error: 'User not found' };
      }
      
      const claim = await prisma.claim.create({
        data: {
          userId: dbUser.id,
          lenderId,
          status: 'NEW',
        },
        include: {
          lender: true,
        },
      });
      
      return { success: true, claim };
    } catch (error) {
      console.error('Error creating claim:', error);
      return { success: false, error: 'Failed to create claim' };
    }
  }