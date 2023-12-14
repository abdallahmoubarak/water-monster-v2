import Box from "@/components/atoms/Box";
import Button from "@/components/atoms/Button";
import Input from "@/components/atoms/Input";
import { useState } from "react";
import { FaTrash } from "react-icons/fa";

export default function ViewerSettings() {
  const [users, setUsers] = useState([]);
  const [email, setEmail] = useState("");
  return (
    <>
      <Box title="Viewers">
        {users.map((user: any) => (
          <div className="flex justify-between">
            <div>{user?.email}</div>
            {user?.pending ? (
              <div className="flex items-center">
                <span>Pending...</span>
                <span
                  className="px-2 text-red-500 cursor-pointer"
                  onClick={() => setUsers(users.filter((u) => u !== user))}>
                  <FaTrash />
                </span>
              </div>
            ) : (
              <div></div>
            )}
          </div>
        ))}
        {users.length > 0 && <div className="border border-gray-300"></div>}
        <div>Add Viewer</div>
        <Input
          placeholder="Insert user's email"
          value={email}
          setValue={setEmail}
        />
        <Button
          text="Send"
          onClick={() => {
            setUsers([...users, { email, pending: true }]);
            setEmail("");
          }}
        />
      </Box>
    </>
  );
}
