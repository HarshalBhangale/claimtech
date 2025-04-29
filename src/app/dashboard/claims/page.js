'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import BuddyMailbox from "@/components/buddy-mailbox";
import { Mail, FileText, Clock, CheckCircle, AlertCircle, ArrowRight, Menu } from "lucide-react";
import { useMediaQuery } from "@/hooks/use-media-query";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

// Mock data
const mockClaims = [
  {
    id: '1',
    lender: 'Barclays Bank',
    status: 'IN_PROGRESS',
    progress: 60,
    lastUpdated: '2023-10-25T11:15:00Z',
    hasDCA: true,
    messages: [
      {
        id: 'msg_1',
        sender: 'Barclays Bank',
        subject: 'Claim Response',
        date: '2023-10-25T11:15:00Z',
        content: 'We have reviewed your claim and would like to offer you a goodwill payment of £2,500.',
        read: true,
        attachments: [
          { name: 'Offer_Letter.pdf', size: '1.8MB' }
        ]
      }
    ]
  },
  {
    id: '2',
    lender: 'Lloyds Bank',
    status: 'PENDING',
    progress: 30,
    lastUpdated: '2023-10-20T14:30:00Z',
    hasDCA: false,
    messages: [
      {
        id: 'msg_2',
        sender: 'Lloyds Bank',
        subject: 'SAR Response',
        date: '2023-10-20T14:30:00Z',
        content: 'Please find attached the information you requested in your Subject Access Request.',
        read: false,
        attachments: [
          { name: 'SAR_Response.pdf', size: '2.4MB' }
        ]
      }
    ]
  }
];

function ProgressTracker({ progress, status }) {
  const getStatusColor = (status) => {
    switch (status) {
      case 'IN_PROGRESS':
        return 'bg-primary';
      case 'PENDING':
        return 'bg-yellow-500';
      case 'COMPLETED':
        return 'bg-green-500';
      case 'FAILED':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium">Progress</span>
        <span className="text-sm text-muted-foreground">{progress}%</span>
      </div>
      <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
        <div
          className={`h-full ${getStatusColor(status)}`}
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}

function StatusBadge({ status }) {
  switch (status) {
    case 'IN_PROGRESS':
      return (
        <Badge variant="default">
          <Clock className="h-3 w-3 mr-1" />
          In Progress
        </Badge>
      );
    case 'PENDING':
      return (
        <Badge variant="warning">
          <Clock className="h-3 w-3 mr-1" />
          Pending
        </Badge>
      );
    case 'COMPLETED':
      return (
        <Badge variant="success">
          <CheckCircle className="h-3 w-3 mr-1" />
          Completed
        </Badge>
      );
    case 'FAILED':
      return (
        <Badge variant="destructive">
          <AlertCircle className="h-3 w-3 mr-1" />
          Failed
        </Badge>
      );
    default:
      return null;
  }
}

export default function ClaimsDashboard() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('overview');
  const isMobile = useMediaQuery('(max-width: 768px)');

  const handleSendMessage = async (message) => {
    // TODO: Implement message sending logic
    console.log('Sending message:', message);
  };

  const renderMobileClaimsList = () => (
    <div className="space-y-4">
      {mockClaims.map((claim) => (
        <Card key={claim.id}>
          <CardContent className="p-4">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <h3 className="font-medium">{claim.lender}</h3>
                  {claim.hasDCA && (
                    <Badge variant="warning">DCA</Badge>
                  )}
                </div>
                <StatusBadge status={claim.status} />
              </div>
              <ProgressTracker progress={claim.progress} status={claim.status} />
              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <span>Last updated: {new Date(claim.lastUpdated).toLocaleDateString()}</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => router.push(`/dashboard/claims/${claim.id}`)}
                >
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );

  const renderDesktopClaimsTable = () => (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Lender</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Progress</TableHead>
          <TableHead>Last Updated</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {mockClaims.map((claim) => (
          <TableRow key={claim.id}>
            <TableCell>
              <div className="flex items-center space-x-2">
                <span>{claim.lender}</span>
                {claim.hasDCA && (
                  <Badge variant="warning">DCA</Badge>
                )}
              </div>
            </TableCell>
            <TableCell>
              <StatusBadge status={claim.status} />
            </TableCell>
            <TableCell>
              <ProgressTracker progress={claim.progress} status={claim.status} />
            </TableCell>
            <TableCell>
              {new Date(claim.lastUpdated).toLocaleDateString()}
            </TableCell>
            <TableCell>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => router.push(`/dashboard/claims/${claim.id}`)}
              >
                <ArrowRight className="h-4 w-4" />
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Claims Management</h1>
          <p className="text-muted-foreground">
            Track and manage your claims with lenders
          </p>
        </div>
        <div className="flex items-center gap-2">
          {isMobile && (
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon">
                  <Menu className="h-4 w-4" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left">
                <SheetHeader>
                  <SheetTitle>Navigation</SheetTitle>
                </SheetHeader>
                <div className="flex flex-col gap-2 mt-4">
                  <Button
                    variant={activeTab === 'overview' ? 'default' : 'ghost'}
                    onClick={() => setActiveTab('overview')}
                    className="justify-start"
                  >
                    Overview
                  </Button>
                  <Button
                    variant={activeTab === 'mailbox' ? 'default' : 'ghost'}
                    onClick={() => setActiveTab('mailbox')}
                    className="justify-start"
                  >
                    Buddy Mailbox
                  </Button>
                  <Button
                    variant={activeTab === 'progress' ? 'default' : 'ghost'}
                    onClick={() => setActiveTab('progress')}
                    className="justify-start"
                  >
                    Progress Tracker
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          )}
          <Button onClick={() => router.push('/dashboard/claims/new')}>
            <FileText className="h-4 w-4 mr-2" />
            New Claim
          </Button>
        </div>
      </div>

      {!isMobile && (
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="mailbox">Buddy Mailbox</TabsTrigger>
            <TabsTrigger value="progress">Progress Tracker</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Active Claims</CardTitle>
                <CardDescription>
                  View and manage your current claims
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  {renderDesktopClaimsTable()}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recent Messages</CardTitle>
                <CardDescription>
                  Latest communications from lenders
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockClaims.flatMap(claim => claim.messages)
                    .sort((a, b) => new Date(b.date) - new Date(a.date))
                    .slice(0, 3)
                    .map((message) => (
                      <div key={message.id} className="flex items-start space-x-4">
                        <Mail className="h-5 w-5 text-muted-foreground mt-1" />
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <h4 className="font-medium">{message.subject}</h4>
                            <span className="text-sm text-muted-foreground">
                              {new Date(message.date).toLocaleDateString()}
                            </span>
                          </div>
                          <p className="text-sm text-muted-foreground">{message.content}</p>
                        </div>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="mailbox">
            <BuddyMailbox
              messages={mockClaims.flatMap(claim => claim.messages)}
              onSendMessage={handleSendMessage}
            />
          </TabsContent>

          <TabsContent value="progress">
            <Card>
              <CardHeader>
                <CardTitle>Lender Progress Tracker</CardTitle>
                <CardDescription>
                  Track the progress of your claims with each lender
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {mockClaims.map((claim) => (
                    <div key={claim.id} className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <h3 className="font-medium">{claim.lender}</h3>
                          {claim.hasDCA && (
                            <Badge variant="warning">DCA</Badge>
                          )}
                        </div>
                        <StatusBadge status={claim.status} />
                      </div>
                      <ProgressTracker progress={claim.progress} status={claim.status} />
                      <div className="text-sm text-muted-foreground">
                        Last updated: {new Date(claim.lastUpdated).toLocaleDateString()}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      )}

      {isMobile && (
        <div className="space-y-6">
          {activeTab === 'overview' && (
            <>
              <Card>
                <CardHeader>
                  <CardTitle>Active Claims</CardTitle>
                  <CardDescription>
                    View and manage your current claims
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {renderMobileClaimsList()}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Recent Messages</CardTitle>
                  <CardDescription>
                    Latest communications from lenders
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {mockClaims.flatMap(claim => claim.messages)
                      .sort((a, b) => new Date(b.date) - new Date(a.date))
                      .slice(0, 3)
                      .map((message) => (
                        <div key={message.id} className="flex items-start space-x-4">
                          <Mail className="h-5 w-5 text-muted-foreground mt-1" />
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <h4 className="font-medium">{message.subject}</h4>
                              <span className="text-sm text-muted-foreground">
                                {new Date(message.date).toLocaleDateString()}
                              </span>
                            </div>
                            <p className="text-sm text-muted-foreground">{message.content}</p>
                          </div>
                        </div>
                      ))}
                  </div>
                </CardContent>
              </Card>
            </>
          )}

          {activeTab === 'mailbox' && (
            <BuddyMailbox
              messages={mockClaims.flatMap(claim => claim.messages)}
              onSendMessage={handleSendMessage}
            />
          )}

          {activeTab === 'progress' && (
            <Card>
              <CardHeader>
                <CardTitle>Lender Progress Tracker</CardTitle>
                <CardDescription>
                  Track the progress of your claims with each lender
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {mockClaims.map((claim) => (
                    <div key={claim.id} className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <h3 className="font-medium">{claim.lender}</h3>
                          {claim.hasDCA && (
                            <Badge variant="warning">DCA</Badge>
                          )}
                        </div>
                        <StatusBadge status={claim.status} />
                      </div>
                      <ProgressTracker progress={claim.progress} status={claim.status} />
                      <div className="text-sm text-muted-foreground">
                        Last updated: {new Date(claim.lastUpdated).toLocaleDateString()}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      )}
    </div>
  );
} 