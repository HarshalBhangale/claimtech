'use server';

import { auth, currentUser } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";

/**
 * Get current user data from Clerk and our database
 * Syncs Clerk user data with our database
 * @returns {Object} User data or error response
 */
export async function getUser() {
  try {
    const { userId } = auth();
    if (!userId) {
      return { error: "Unauthorized", status: 401 };
    }

    // Get user data from Clerk
    const clerkUser = await currentUser();
    if (!clerkUser) {
      return { error: "Failed to fetch Clerk user data", status: 500 };
    }

    // Get user from our database or create a new entry
    let dbUser = await prisma.user.findFirst({
      where: { clerkId: userId },
      include: {
        addresses: true,
        previousNames: true
      }
    });
    
    if (!dbUser) {
      // Create a new user record with data from Clerk
      dbUser = await prisma.user.create({
        data: {
          clerkId: userId,
          email: clerkUser.emailAddresses?.[0]?.emailAddress || "",
          firstName: clerkUser.firstName || "",
          lastName: clerkUser.lastName || "",
          userType: "USER", // Default user type
        }
      });
    } else if (shouldSyncUserData(dbUser, clerkUser)) {
      // Update user data if Clerk data has changed
      dbUser = await prisma.user.update({
        where: { id: dbUser.id },
        data: {
          email: clerkUser.emailAddresses?.[0]?.emailAddress || dbUser.email,
          firstName: clerkUser.firstName || dbUser.firstName,
          lastName: clerkUser.lastName || dbUser.lastName,
        },
        include: {
          addresses: true,
          previousNames: true
        }
      });
    }

    return { data: dbUser, status: 200 };
  } catch (error) {
    console.error("Error fetching user:", error);
    return { error: "Error fetching user", status: 500 };
  }
}

/**
 * Helper to determine if user data needs to be synced
 */
function shouldSyncUserData(dbUser, clerkUser) {
  if (!dbUser || !clerkUser) return false;
  
  const clerkEmail = clerkUser.emailAddresses?.[0]?.emailAddress || "";
  
  return (
    (clerkEmail && clerkEmail !== dbUser.email) ||
    (clerkUser.firstName && clerkUser.firstName !== dbUser.firstName) ||
    (clerkUser.lastName && clerkUser.lastName !== dbUser.lastName)
  );
}

/**
 * Update user profile information
 * @param {Object} userData Updated user data
 * @returns {Object} Success or error response
 */
export async function updateUser(userData) {
  try {
    const { userId } = auth();
    if (!userId) {
      return { error: "Unauthorized", status: 401 };
    }

    // Check if user exists in our database
    const dbUser = await prisma.user.findFirst({
      where: { clerkId: userId }
    });
    
    if (!dbUser) {
      return { error: "User not found in database", status: 404 };
    }

    // Update user with provided data
    const updatedUser = await prisma.user.update({
      where: { id: dbUser.id },
      data: userData
    });

    return { message: "User updated successfully", status: 200 };
  } catch (error) {
    console.error("Error updating user:", error);
    return { error: "Error updating user", status: 500 };
  }
}

/**
 * Get the user type for the currently authenticated user
 * @returns {String|Object} User type or error response
 */
export async function getUserType() {
  try {
    const { userId } = auth();
    if (!userId) {
      return { error: "Unauthorized", status: 401 };
    }

    // Get user from our database
    const dbUser = await prisma.user.findFirst({
      where: { clerkId: userId }
    });
    
    if (!dbUser) {
      return { error: "User not found in database", status: 404 };
    }

    return dbUser.userType;
  } catch (error) {
    console.error("Error fetching user type:", error);
    return { error: "Error fetching user type", status: 500 };
  }
}

/**
 * Get user claims associated with the current user
 * @returns {Array|Object} User claims or error response
 */
export async function getUserClaims() {
  try {
    const { userId } = auth();
    if (!userId) {
      return { error: "Unauthorized", status: 401 };
    }

    // Get user from database
    const dbUser = await prisma.user.findFirst({
      where: { clerkId: userId }
    });

    if (!dbUser) {
      return { error: "User not found in database", status: 404 };
    }

    // Get claims with lender information
    const claims = await prisma.claim.findMany({
      where: { userId: dbUser.id },
      include: {
        lender: true
      },
      orderBy: {
        submittedAt: 'desc'
      }
    });

    return claims;
  } catch (error) {
    console.error("Error fetching user claims:", error);
    return { error: "Error fetching user claims", status: 500 };
  }
} 