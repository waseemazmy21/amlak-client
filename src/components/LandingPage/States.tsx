import {
    Users,
    Award,
    TrendingUp,
    Home,

} from "lucide-react"

const stats = [
    { icon: Home, value: "10,000+", label: "Properties Listed" },
    { icon: Users, value: "50,000+", label: "Happy Customers" },
    { icon: Award, value: "15+", label: "Years Experience" },
    { icon: TrendingUp, value: "98%", label: "Success Rate" },
];

const States = () => {
    return (
        < section className="py-20 bg-white" >
            <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                    {stats.map((state) => (
                        <div
                            key={state.label}
                            className="text-center group"
                        >
                            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl mb-4 group-hover:scale-110 transition-transform duration-300">
                                <state.icon className="h-8 w-8 text-white" />
                            </div>
                            <div className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                                {state.value}
                            </div>
                            <div className="text-gray-600 font-medium">{state.label}</div>
                        </div>
                    ))}
                </div>
            </div>
        </section >
    )
}

export default States