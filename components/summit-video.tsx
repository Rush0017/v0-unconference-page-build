export function SummitVideo() {
    return (
        <div className="bg-gradient-to-br from-[#1C3B2E] to-[#234E3A] py-24 rounded-[32px] shadow-2xl">
            <div className="container mx-auto px-10">
                <div className="relative w-full pb-[56.25%]">
                    <iframe
                        className="absolute top-0 left-0 w-full h-full rounded-xl"
                        src="https://www.youtube.com/embed/qTPbRQp5n_M?si=Wok9_w-SuL52Uy9p"
                        title="YouTube video player"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen
                    />
                </div>
            </div>
        </div>
    );
}
