
import React from "react";
import { User } from "@/types/user.types";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";

interface UserSelectDropdownProps {
  users: User[];
  selectedUser: User | null;
  onSelectUser: (user: User | null) => void;
  isLoading?: boolean;
}

const UserSelectDropdown: React.FC<UserSelectDropdownProps> = ({ users, selectedUser, onSelectUser, isLoading }) => (
  <div className="mb-4">
    <Select
      value={selectedUser?.id || ""}
      onValueChange={id => {
        const found = users.find(u => u.id === id);
        onSelectUser(found || null);
      }}
      disabled={isLoading}
    >
      <SelectTrigger className="w-full max-w-xs">
        <SelectValue placeholder={isLoading ? "Loading users..." : "Select a user"} />
      </SelectTrigger>
      <SelectContent>
        {users.map(user => (
          <SelectItem key={user.id} value={user.id}>
            {user.name} <span className="text-xs text-muted-foreground ml-2">{user.email}</span>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  </div>
);

export default UserSelectDropdown;
