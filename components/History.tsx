import { createClient } from '@/utils/supabase/server'
import Link from 'next/link'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

type Props = {
};

interface Chat {
  role: "user" | "machine";
  message: string;
  options?: string[];
}

export default async function History({}: Props) {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)

  // const {
  //   data: { user },
  // } = await supabase.auth.getUser()


  return (
    <div className=" w-full">
      <div className="conversation py-4 max-h-[500px] overflow-y-scroll">
        {conversation.map((item, index) => {
          return (
            <div
              key={index}
              className={`chat ${
                item.role === "machine" ? "chat-start" : "chat-end"
              }`}
            >
              <div className="chat-bubble">
                {item.message}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

