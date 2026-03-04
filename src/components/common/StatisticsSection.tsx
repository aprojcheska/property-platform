"use client"

import {
    MousePointerClick,
    TrendingUp,
    BarChart3,
    Percent,
} from "lucide-react"

type StatCardProps = {
    title: string
    value: string
    subtitle?: string
    icon: React.ElementType
    badge?: string
    badgeColor?: string
}

function StatCard({
                      title,
                      value,
                      subtitle,
                      icon: Icon,
                      badge,
                      badgeColor = "bg-green-100 text-green-600",
                  }: StatCardProps) {
    return (
        <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition p-6 flex items-center gap-4">
            <div className="w-14 h-14 rounded-xl bg-[#FCE3DE] flex items-center justify-center">
                <Icon className="text-[#B23A3A]" size={24} />
            </div>

            <div className="flex-1">
                <p className="text-sm text-gray-500">{title}</p>

                <h3 className="text-2xl font-semibold mt-1 text-[#303c51]">
                    {value}
                </h3>

                {subtitle && (
                    <p className="text-xs text-gray-400 mt-1">{subtitle}</p>
                )}

                {badge && (
                    <span
                        className={`inline-block mt-2 px-3 py-1 text-xs rounded-full ${badgeColor}`}
                    >
            {badge}
          </span>
                )}
            </div>
        </div>
    )
}

export function StatisticsSection() {
    // 🔥 Mock Data for Now
    const stats = [
        {
            title: "Вкупно кликови",
            value: "12,450",
            subtitle: "Преку сите огласи",
            icon: MousePointerClick,
            badge: "+8% оваа недела",
        },
        {
            title: "Најотворан оглас",
            value: "Оглас",
            subtitle: "1,240 clicks",
            icon: TrendingUp,
            badge: "🔥 Популарно",
            badgeColor: "bg-orange-100 text-orange-600",
        },
        {
            title: "Активни огласи",
            value: "18",
            subtitle: "Мометално објавени",
            icon: BarChart3,
            badge: "+2 нови оваа недела",
        },
        {
            title: "Претворачки процент",
            value: "4.8%",
            subtitle: "Клик → Повик",
            icon: Percent,
            badge: "+1.2% раст",
        },
    ]

    return (
        <section className="mt-12">
            <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 xl:grid-cols-4">
                {stats.map((stat, index) => (
                    <StatCard key={index} {...stat} />
                ))}
            </div>
        </section>
    )
}