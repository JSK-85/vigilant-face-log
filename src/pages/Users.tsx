
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { mockUsers } from '@/utils/faceDetection';
import UserRegistration from '@/components/UserRegistration';
import { Search, Plus, Edit, Trash2 } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";

const Users = () => {
  const [users, setUsers] = useState(mockUsers);
  const [searchQuery, setSearchQuery] = useState('');
  const [isAddingUser, setIsAddingUser] = useState(false);
  const { toast } = useToast();

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.role.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleRegisterUser = (userData: any) => {
    const newUser = {
      ...userData,
      id: `user-${Date.now()}`,
      registered: new Date().toISOString().split('T')[0],
      lastSeen: new Date().toISOString(),
      descriptor: new Float32Array(128).fill(0).map(() => Math.random() - 0.5)
    };
    
    setUsers([newUser, ...users]);
    setIsAddingUser(false);
    
    toast({
      title: "User registered",
      description: `${userData.name} has been successfully added to the system.`,
    });
  };

  const handleDeleteUser = (userId: string) => {
    setUsers(users.filter(user => user.id !== userId));
    
    toast({
      title: "User removed",
      description: "The user has been removed from the system.",
    });
  };

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold">Users Management</h1>
      
      <Tabs defaultValue="list" className="w-full">
        <TabsList>
          <TabsTrigger value="list">User List</TabsTrigger>
          <TabsTrigger value="add">Add New User</TabsTrigger>
        </TabsList>
        
        <TabsContent value="list" className="space-y-4">
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search users by name, email, or role..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          
          <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {filteredUsers.length === 0 ? (
              <div className="col-span-full p-8 text-center">
                <p className="text-muted-foreground">No users found</p>
              </div>
            ) : (
              filteredUsers.map((user) => (
                <Card key={user.id}>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-4">
                      {user.imageUrl ? (
                        <img
                          src={user.imageUrl}
                          alt={user.name}
                          className="w-16 h-16 rounded-full object-cover border"
                        />
                      ) : (
                        <div className="w-16 h-16 rounded-full bg-brand-lightBlue flex items-center justify-center">
                          <span className="text-white font-bold text-xl">
                            {user.name.charAt(0)}
                          </span>
                        </div>
                      )}
                      
                      <div className="flex-1">
                        <h3 className="font-semibold">{user.name}</h3>
                        <p className="text-sm text-muted-foreground">{user.email}</p>
                        <div className="flex flex-wrap gap-2 mt-1">
                          <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold">
                            {user.role}
                          </span>
                          <span className="inline-flex items-center rounded-full bg-green-50 text-green-700 dark:bg-green-500/20 dark:text-green-400 px-2.5 py-0.5 text-xs font-semibold">
                            Active
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-4 text-xs text-muted-foreground">
                      <p>Registered: {formatDate(user.registered)}</p>
                      <p>Last seen: {formatDate(user.lastSeen.split('T')[0])}</p>
                    </div>
                    
                    <div className="mt-4 flex justify-end gap-2">
                      <Button variant="outline" size="icon">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="outline" 
                        size="icon" 
                        className="text-red-500 hover:text-red-600"
                        onClick={() => handleDeleteUser(user.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </TabsContent>
        
        <TabsContent value="add">
          <UserRegistration onRegister={handleRegisterUser} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Users;
