import { auth } from '@clerk/nextjs';
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(req) {
  const { userId } = auth();
  
  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  
  try {
    const { lenderIds } = await req.json();
    
    if (!lenderIds || !Array.isArray(lenderIds) || lenderIds.length === 0) {
      return NextResponse.json(
        { error: 'Please provide at least one lender ID' },
        { status: 400 }
      );
    }
    
    // Get the user from the database
    const user = await prisma.user.findFirst({
      where: { clerkId: userId },
    });
    
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }
    
    // Create claims for each lender
    const claims = await Promise.all(
      lenderIds.map(async (lenderId) => {
        const lender = await prisma.lender.findUnique({
          where: { id: lenderId },
        });
        
        if (!lender) {
          return null;
        }
        
        return prisma.claim.create({
          data: {
            userId: user.id,
            lenderId: lender.id,
            status: 'CREATED',
            claimType: [
              ...(lender.hasDCA ? ['DCA'] : []),
              ...(lender.hasHiddenComm ? ['HIDDEN_COMMISSION'] : []),
            ],
            submittedAt: new Date(),
          },
        });
      })
    );
    
    // Filter out any nulls (lenders not found)
    const validClaims = claims.filter(claim => claim !== null);
    
    if (validClaims.length === 0) {
      return NextResponse.json(
        { error: 'No valid claims were created' },
        { status: 400 }
      );
    }
    
    return NextResponse.json({ 
      success: true,
      claims: validClaims
    });
  } catch (error) {
    console.error('Error creating claims:', error);
    return NextResponse.json(
      { error: 'Failed to create claims' },
      { status: 500 }
    );
  }
} 