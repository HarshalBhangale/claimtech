"use client";

import { useState } from "react";
import { Mail, Search, Filter, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Mock data for messages
const mockMessages = [
  {
    id: 1,
    from: "Barclays Bank",
    subject: "SAR Request Acknowledgment",
    preview: "We have received your Subject Access Request and will process it within 30 days...",
    date: "2024-03-15",
    read: false,
    category: "SAR",
    claimId: "CLM-001",
  },
  {
    id: 2,
    from: "HSBC",
    subject: "Claim Response",
    preview: "We have reviewed your claim and would like to offer a settlement of £1,500...",
    date: "2024-03-14",
    read: true,
    category: "Claim",
    claimId: "CLM-002",
  },
  {
    id: 3,
    from: "Lloyds Bank",
    subject: "Additional Information Required",
    preview: "To process your claim, we need some additional information about your account...",
    date: "2024-03-13",
    read: false,
    category: "Info Request",
    claimId: "CLM-003",
  },
];

export default function MailboxPage() {
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("all");
  const [messages, setMessages] = useState(mockMessages);

  const filteredMessages = messages.filter(message => {
    const matchesSearch = message.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         message.from.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filter === "all" || message.category === filter;
    return matchesSearch && matchesFilter;
  });

  const handleMessageClick = (message) => {
    setSelectedMessage(message);
    // Mark as read
    setMessages(prev => prev.map(m => 
      m.id === message.id ? { ...m, read: true } : m
    ));
  };

  const handleRefresh = () => {
    // In a real app, this would fetch new messages
    console.log("Refreshing messages...");
  };

  return (
    <div className="container max-w-7xl py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold">Buddy Mailbox</h1>
          <p className="text-muted-foreground mt-2">
            Manage your lender communications in one place
          </p>
        </div>
        <Button onClick={handleRefresh}>
          <RefreshCw className="h-4 w-4 mr-2" />
          Refresh
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Message List */}
        <Card className="md:col-span-1">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Input
                placeholder="Search messages..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            </div>
            <div className="mt-4">
              <Select value={filter} onValueChange={setFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter by category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Messages</SelectItem>
                  <SelectItem value="SAR">SAR Requests</SelectItem>
                  <SelectItem value="Claim">Claims</SelectItem>
                  <SelectItem value="Info Request">Info Requests</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y">
              {filteredMessages.map((message) => (
                <div
                  key={message.id}
                  className={`p-4 cursor-pointer hover:bg-accent ${
                    selectedMessage?.id === message.id ? "bg-accent" : ""
                  }`}
                  onClick={() => handleMessageClick(message)}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-medium">{message.from}</h3>
                      <p className="text-sm text-muted-foreground">{message.subject}</p>
                      <p className="text-xs text-muted-foreground mt-1">{message.preview}</p>
                    </div>
                    <div className="flex flex-col items-end">
                      <span className="text-xs text-muted-foreground">{message.date}</span>
                      {!message.read && (
                        <Badge variant="secondary" className="mt-1">New</Badge>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Message Detail */}
        <Card className="md:col-span-3">
          {selectedMessage ? (
            <>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>{selectedMessage.subject}</CardTitle>
                    <CardDescription>
                      From: {selectedMessage.from} • {selectedMessage.date}
                    </CardDescription>
                  </div>
                  <Badge variant="outline">{selectedMessage.category}</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="prose max-w-none">
                  <p>Dear Customer,</p>
                  <p>{selectedMessage.preview}</p>
                  <p>Best regards,<br />{selectedMessage.from}</p>
                </div>
                <div className="mt-6">
                  <Button variant="outline" className="mr-2">
                    Reply
                  </Button>
                  <Button variant="outline">
                    Forward
                  </Button>
                </div>
              </CardContent>
            </>
          ) : (
            <CardContent className="flex items-center justify-center h-full">
              <div className="text-center">
                <Mail className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium">Select a message to view</h3>
                <p className="text-sm text-muted-foreground">
                  Choose a message from the list to read its contents
                </p>
              </div>
            </CardContent>
          )}
        </Card>
      </div>
    </div>
  );
} 