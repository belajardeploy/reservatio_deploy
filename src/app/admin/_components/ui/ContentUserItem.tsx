import React from "react";
import Image from "next/image";
import Link from "next/link";
import DangerAltButton from "@/components/button/DangerAltButton";
import SecondaryButton from "@/components/button/SecondaryButton";
import { kelolauserresponse } from "@/components/json/admin/KelolaUserResponse";

interface UserItemProps {
  users: kelolauserresponse[];
  onBlock: (user: kelolauserresponse) => void;
}

export default function UserItem({ users, onBlock }: UserItemProps) {
  if (users?.length < 1) {
    return (
      <div className="text-center py-2 text-sm text-neutral-3">
        Tidak ada pengguna yang ditemukan.
      </div>
    );
  }
  return (
    users.map((user, index) => (
    <div className="px-4 py-3 border-b-2 border-neutral-4 w-full" key={index}>
      <div className="flex items-center gap-4">
        <Image
          className="rounded-full w-12 h-12 object-cover"
          width={48}
          height={48}
          src={user.photo}
          alt="Profile Picture"
          unoptimized
        />
        <div className="space-y-2">
          <h2 className="text-sm font-semibold">{user.name}</h2>
          <p className="text-primary-1 bg-primary-3/10 rounded-md p-1 px-1.5 text-xss w-fit">
            {user.nim}
          </p>
        </div>
        <div className="flex gap-2 items-center ml-auto">
          <DangerAltButton
            className="px-4 py-1.5 text-sm"
            onClick={() => onBlock(user)}
          >
            {user.is_banned ? "Buka Blokir" : "Blokir"}
          </DangerAltButton>
          <Link href={`/admin/kelola_pengguna/detail_pengguna/${user.id}`}>
            <SecondaryButton className="w-[70px] text-sm">Lihat</SecondaryButton>
          </Link>
        </div>
      </div>
    </div>
    ))
  );
}