"use client"

import { useState } from "react"
import {
    Home,
    Euro,
    Bed,
    Bath,
    Layers,
    Sun,
    Car,
    Sofa,
    Wind,
    MapPin,
    Calendar,
    Building,
    Phone, Plus,
} from "lucide-react"

import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import {floor} from "effect/BigDecimal";
import {redirect} from "next/navigation";

type Props = {
    initialData?: any
    isEditMode?: boolean
}

export function CreatePropertyForm({ initialData, isEditMode }: Props) {
    const [loading, setLoading] = useState(false)

    const [hasTerrace, setHasTerrace] = useState(initialData?.has_terrace || false)
    const [hasParking, setHasParking] = useState(initialData?.has_parking || false)
    const [hasElevator, setHasElevator] = useState(initialData?.has_elevator || false)
    const [furnished, setFurnished] = useState(initialData?.furnished || false)
    const [selectedFiles, setSelectedFiles] = useState<File[]>([])
    const [previewImages, setPreviewImages] = useState<string[]>([])

    function handleImages(e: React.ChangeEvent<HTMLInputElement>) {
        if (!e.target.files) return

        const files = Array.from(e.target.files)

        setSelectedFiles(prev => [...prev, ...files])

        const previews = files.map(file => URL.createObjectURL(file))
        setPreviewImages(prev => [...prev, ...previews])
    }

    function removeImage(index: number) {
        setSelectedFiles(prev => prev.filter((_, i) => i !== index))
        setPreviewImages(prev => prev.filter((_, i) => i !== index))
    }


    async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        setLoading(true)

        const formData = new FormData(e.currentTarget)

        const payload = {
            title: formData.get("title"),
            property_type: formData.get("property_type"),
            listing_type: formData.get("listing_type"),
            price: Number(formData.get("price")),
            currency: formData.get("currency"),
            area_sqm: Number(formData.get("area_sqm")),
            rooms: Number(formData.get("rooms")),
            bedrooms: Number(formData.get("bedrooms")),
            bathrooms: Number(formData.get("bathrooms")),
            floor: Number(formData.get("floor")),
            city: formData.get("city"),
            detailed_location: formData.get("detailed_location"),
            orientation: formData.get("orientation"),
            year_built: Number(formData.get("year_built")),
            condition: formData.get("condition"),
            available_from: formData.get("available_from"),
            stay_duration_months: formData.get("stay_duration_months"),
            klima: formData.get("klima"),
            description: formData.get("description"),
            contact_name: formData.get("contact_name"),
            contact_phone: formData.get("contact_phone"),
            contact_email: formData.get("contact_email"),
            has_terrace: hasTerrace,
            has_parking: hasParking,
            has_elevator: hasElevator,
            furnished: furnished,
        }

        const endpoint = isEditMode
            ? `/api/properties/${initialData.id}`
            : "/api/create"

        const method = isEditMode ? "PUT" : "POST"

        const propertyRes = await fetch(endpoint, {
            method,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
        })

        const property = await propertyRes.json()

        if (selectedFiles.length > 0) {
            const uploadData = new FormData()

            selectedFiles.forEach(file => {
                uploadData.append("files", file)
            })

            uploadData.append("propertyId", property.id)

            await fetch("/api/photos", {
                method: "POST",
                body: uploadData,
            })
        }

        setLoading(false)
        alert("Огласот е успешно креиран!")
        redirect("/properties")
    }

    return (
        <form onSubmit={onSubmit} className="max-w-full mx-auto space-y-14 pb-20">

            {/* ROW 1 */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

                {/* BASIC INFO */}
                <div className="space-y-6">
                    <SectionTitle icon={Home} title="Основни информации" />

                    <Input
                        name="title"
                        placeholder="Наслов"
                        required
                        defaultValue={initialData?.title}
                    />

                    <div className="grid grid-cols-2 gap-4">
                        <Select name="property_type" defaultValue={initialData?.property_type}>
                            <SelectTrigger>
                                <SelectValue placeholder="Тип на недвижнина" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="Стан">Стан</SelectItem>
                                <SelectItem value="Куќа">Куќа</SelectItem>
                                <SelectItem value="Деловен простор">Деловен простор</SelectItem>
                            </SelectContent>
                        </Select>

                        <Select name="listing_type" defaultValue={initialData?.listing_type}>
                            <SelectTrigger>
                                <SelectValue placeholder="Тип на оглас" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="Издавање">Издавање</SelectItem>
                                <SelectItem value="Продажба">Продажба</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                {/* PRICE */}
                <div className="space-y-6">
                    <SectionTitle icon={Euro} title="Цена и површина" />

                    <Input type="number" name="price" placeholder="Цена" required defaultValue={initialData?.price} />

                    <div className="grid grid-cols-2 gap-4">
                        <Select name="currency" defaultValue={initialData?.currency || "EUR"}>
                            <SelectTrigger>
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="EUR">EUR</SelectItem>
                                <SelectItem value="MKD">MKD</SelectItem>
                            </SelectContent>
                        </Select>

                        <Input type="number" name="area_sqm" placeholder="Површина m²" defaultValue={initialData?.area_sqm} />
                    </div>
                </div>
            </div>

            {/* PHOTOS */}
            <div>
                <SectionTitle title="Фотографии" />

                <div className="mt-6">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">

                        {/* Existing Images */}
                        {previewImages.map((img, index) => (
                            <div
                                key={index}
                                className="relative group rounded-xl overflow-hidden border"
                            >
                                <img
                                    src={img}
                                    className="h-60 w-full object-contain"
                                />

                                {/* Remove Button */}
                                <button
                                    type="button"
                                    onClick={() => removeImage(index)}
                                    className="absolute top-2 right-2 bg-white text-[#B23A3A] rounded-full px-2.5 py-1 shadow opacity-0 group-hover:opacity-100 transition"
                                >
                                    ✕
                                </button>
                            </div>
                        ))}

                        {/* Add Button */}
                        <label className="h-60 flex items-center justify-center border-2 border-dashed border-[#B23A3A]rounded-xl cursor-pointer hover:bg-red-50 transition">
                            <div className="flex flex-col items-center text-[#B23A3A]">
                                <Plus size={28} />
                                <span className="text-sm mt-1">Додај</span>
                            </div>
                            <input
                                type="file"
                                multiple
                                accept="image/*"
                                className="hidden"
                                onChange={handleImages}
                            />
                        </label>

                    </div>
                </div>
            </div>



            {/* ROOMS */}
            <div>
                <SectionTitle icon={Bed} title="Простории" />

                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-6">
                    <Input type="number" name="rooms" placeholder="Соби" defaultValue={initialData?.rooms} />
                    <Input type="number" name="bedrooms" placeholder="Спални"  defaultValue={initialData?.bedrooms} />
                    <Input type="number" name="bathrooms" placeholder="Бањи" defaultValue={initialData?.bthrooms} />
                    <Input type="number" name="floor" placeholder="Кат" defaultValue={initialData?.floor} />
                </div>
            </div>

            {/* AMENITIES */}
            <div>
                <SectionTitle icon={Building} title="Погодности" />

                <div className="flex flex-wrap gap-4 mt-6">
                    <AmenityChip icon={Sun} label="Тераса" state={hasTerrace} setState={setHasTerrace} />
                    <AmenityChip icon={Car} label="Паркинг" state={hasParking} setState={setHasParking} />
                    <AmenityChip icon={Layers} label="Лифт" state={hasElevator} setState={setHasElevator} />
                    <AmenityChip icon={Sofa} label="Опремен" state={furnished} setState={setFurnished} />
                </div>
            </div>

            {/* LOCATION */}
            <div>
                <SectionTitle icon={MapPin} title="Локација" />

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
                    <Input name="city" placeholder="Град" defaultValue={initialData?.city} />
                    <Input name="detailed_location" placeholder="Детална локација" defaultValue={initialData?.detailed_location} />
                    <Input name="orientation" placeholder="Ориентација" defaultValue={initialData?.orientation} />
                </div>
            </div>

            {/* DETAILS */}
            <div>
                <SectionTitle icon={Calendar} title="Дополнителни детали" />

                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-6">
                    <Input type="number" name="year_built" placeholder="Година" defaultValue={initialData?.year_built} />

                    <Select name="condition">
                        <SelectTrigger>
                            <SelectValue placeholder="Состојба" defaultValue={initialData?.condition} />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="Нова">Нова</SelectItem>
                            <SelectItem value="Стара">Стара</SelectItem>
                            <SelectItem value="Реновирана">Реновирана</SelectItem>
                        </SelectContent>
                    </Select>

                    <Input type="date" name="available_from" />

                    <Select name="stay_duration_months">
                        <SelectTrigger>
                            <SelectValue placeholder="Престој" defaultValue={initialData?.stay_duration_months} />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="Краток">Краток</SelectItem>
                            <SelectItem value="Долг">Долг</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>

            {/* DESCRIPTION */}
            <div>
                <SectionTitle title="Опис" />
                <Textarea rows={6} name="description" placeholder="Детален опис..." className="mt-6" defaultValue={initialData?.description} />
            </div>

            {/* CONTACT */}
            <div>
                <SectionTitle icon={Phone} title="Контакт" />

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
                    <Input name="contact_name" placeholder="Име" defaultValue={initialData?.contact_name} />
                    <Input name="contact_phone" placeholder="Телефон" defaultValue={initialData?.contact_phone} />
                    <Input name="contact_email" type="email" placeholder="Email" defaultValue={initialData?.contact_email} />
                </div>
            </div>

            <div className="text-center pt-6">
                <Button
                    type="submit"
                    disabled={loading}
                    className="bg-[#B23A3A] hover:bg-[#B22D2D] px-12 py-6 text-lg cursor-pointer"
                >
                    {loading
                        ? "Зачувувам..."
                        : isEditMode
                            ? "Зачувај измени"
                            : "Објави оглас"}
                </Button>
            </div>
        </form>
    )
}


function SectionTitle({ icon: Icon, title }: any) {
    return (
        <h2 className="flex items-center gap-2 text-xl font-semibold text-[#B23A3A]">
            {Icon && <Icon size={18} />}
            {title}
        </h2>
    )
}

function AmenityChip({ icon: Icon, label, state, setState }: any) {
    return (
        <button
            type="button"
            onClick={() => setState(!state)}
            className={`flex items-center gap-2 px-4 py-2 rounded-full border transition
        ${
                state
                    ? "bg-red-50 border-[#B23A3A] text-[#B23A3A]"
                    : "border-gray-300 hover:border-[#B22D2D]"
            }`}
        >
            <Icon size={16} />
            {label}
        </button>
    )
}
