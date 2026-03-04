
export function ContactBox({ contact }: { contact: any }) {
    return (
        <div className="rounded-2xl border bg-white shadow-lg p-6">
            <h3 className="font-semibold text-lg mb-4">Информации за контакт</h3>

            <p>{contact.name}</p>
            <p className="mt-2">{contact.phone}</p>
            <p className="mt-1 text-sm text-gray-500">{contact.email}</p>

            <button className="mt-6 w-full bg-[#B23A3A] text-white py-2 rounded-md hover:scale-[1.02] transition-transform">
                Контактирај
            </button>
        </div>
    )
}
