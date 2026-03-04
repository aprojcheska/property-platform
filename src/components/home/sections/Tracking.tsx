import {CircleCheck, House, MessagesSquare} from "lucide-react";

const options = [
    {
        id: 1,
        icon: <House size={"40px"} />,
        title: "Frontend Content",
        description: "Find out how much your place is worth in less than a minute. Get monthly updates for your create.",
        action: "Explore Options",
    },
    {
        id: 2,
        icon: <CircleCheck size={"40px"} />,
        title: "Housing Security",
        description: "Find out how much your place is worth in less than a minute. Get monthly updates for your create.",
        action: "Get Advice",
    },
    {
        id: 3,
        icon: <MessagesSquare size={"40px"} />,
        title: "Housing Security",
        description: "Find out how much your place is worth in less than a minute. Get monthly updates for your create.",
        action: "Receive Updates",
    },
]

export function Tracking() {
    return (
        <div className="relative min-h-screen flex items-center justify-center">
            <div
                className="absolute inset-0 bg-cover bg-center"
                style={{
                    backgroundImage: "url('/welcome_bg.jpg')",
                }}
            />
            <div className="relative z-10 mx-auto max-w-[90%] bg-white rounded-xl shadow-2xl px-6 py-16 sm:px-12 mt-4">
                <div className="text-center max-w-3xl mx-auto">
                    <h1
                        className="font-semibold leading-tight
                             text-2xl sm:text-3xl md:text-4xl lg:text-5xl"
                        style={{ fontFamily: "Poppins" }}
                    >
                        Track your property
                    </h1>

                    <p className="mt-4 text-gray-600">
                        Get monthly updates to track the value of your property as the market moves.
                    </p>
                </div>

                <div
                    className="mt-16 grid grid-cols-1 gap-12
                        lg:grid-cols-3 text-center relative"
                >
                    {options.map((item, index) => (
                        <div
                            key={item.id}
                            className="px-6 relative"
                        >
                            {index !== 0 && (
                                <div className="hidden lg:block absolute left-0 top-1/2 -translate-y-1/2 h-40 w-px bg-gray-200" />
                            )}

                            <div className="flex justify-center mb-4 text-[#F32747]">
                                {item.icon}
                            </div>

                            <h3 className="text-lg font-semibold mb-4">
                                {item.title}
                            </h3>

                            <p className="text-gray-600 text-sm leading-relaxed mb-4">
                                {item.description}
                            </p>

                            <button className="text-[#F32747] font-medium hover:underline">
                                {item.action}
                            </button>
                        </div>
                    ))}
                </div>
            </div>


        </div>
    )
}