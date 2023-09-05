type MessageReceiveProps = {
    text: string;
}
export default function MessageReceive({ text }: MessageReceiveProps) {

    return (
        <>
            <div className="w-full">
                <span id="message-send" className={`bg-[#a6abca] w-[340px] h-auto rounded-[5px] p-4 ml-2 mt-2 text-white flex items-center whitespace-normal`}>
                    {text}
                </span>
            </div>
        </>
    )
}