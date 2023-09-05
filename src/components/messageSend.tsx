type MessageSendProps = {
    text: string;
}
export default function MessageSend({ text }: MessageSendProps) {

    return (
        <>
            <div className="w-full">
                <span id="message-send" className={`bg-[#646883] w-[340px] h-auto rounded-[5px] p-4 ml-[69%] mt-2 text-white flex items-center whitespace-normal`}>
                    {text}
                </span>
            </div>
        </>
    )
}