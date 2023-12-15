import Box from "@/components/atoms/Box";
import Button from "@/components/atoms/Button";
import DotsDropDown from "@/components/atoms/DotsDropDown";
import Input from "@/components/atoms/Input";
import { useState } from "react";
import { FaTrash } from "react-icons/fa";

export default function ViewerSettings() {
  const [users, setUsers] = useState([{ email: "xyz", pending: false }]);
  const [email, setEmail] = useState("");

  return (
    <>
      <Box title="Viewers">
        {users.map((user: any, i) => (
          <div key={i} className="flex justify-between">
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
              <DotsDropDown />
            )}
          </div>
        ))}
        {users.length > 0 && <div className="border border-gray-300"></div>}
        <Input
          placeholder="Add viewer's email"
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
