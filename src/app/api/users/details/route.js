import { auth } from '@clerk/nextjs';
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(req) {
  const { userId } = auth();
  
  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  
  try {
    const { dateOfBirth, addresses, previousNames } = await req.json();
    
    // Get the user from the database
    const user = await prisma.user.findFirst({
      where: { clerkId: userId },
    });
    
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }
    
    // Update user with date of birth
    await prisma.user.update({
      where: { id: user.id },
      data: {
        dateOfBirth: new Date(dateOfBirth),
      },
    });
    
    // Update addresses
    if (addresses && addresses.length > 0) {
      // Delete existing addresses
      await prisma.address.deleteMany({
        where: { userId: user.id },
      });
      
      // Create new addresses
      await Promise.all(addresses.map(address => 
        prisma.address.create({
          data: {
            userId: user.id,
            line1: address.line1,
            line2: address.line2 || null,
            city: address.city,
            postcode: address.postcode,
            country: address.country || 'United Kingdom',
            current: address.current || false,
          },
        })
      ));
    }
    
    // Update previous names
    if (previousNames && previousNames.length > 0) {
      // Delete existing previous names
      await prisma.previousName.deleteMany({
        where: { userId: user.id },
      });
      
      // Create new previous names
      await Promise.all(previousNames.map(name => 
        prisma.previousName.create({
          data: {
            userId: user.id,
            firstName: name.firstName,
            lastName: name.lastName,
          },
        })
      ));
    }
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error updating user details:', error);
    return NextResponse.json(
      { error: 'Failed to update user details' },
      { status: 500 }
    );
  }
} 