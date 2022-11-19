interface Props {
    content: string,
    closeModal: () => void
}

export default function Modal(props: Props) {
    return (
        <div className="h-screen w-screen fixed top-0 left-0 flex justify-center items-center bg-black bg-opacity-50 z-10">
            <div className="absolute bottom-0 left-0 w-full h-1/2 bg-white rounded-t-3xl p-2 px-4">
                <div className="absolute top-0 right-0 m-4" onClick={props.closeModal}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                        <path fill-rule="evenodd" d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z" clip-rule="evenodd" />
                    </svg>
                </div>
                <div className="h-full overflow-auto">
                    <p className="text-lg mt-10">{props.content}</p>
                </div>
            </div>
        </div >
    )
}