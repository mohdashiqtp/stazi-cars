import { Users , Fuel ,Gauge ,LifeBuoy , Heart } from 'lucide-react'


type CarCardProps = {

    image: string;
    title: string;
    start_production: number;
    class : number ;
}

export default function CarCard({ title , image , start_production ,} : CarCardProps) {

    return (
        <div className="shadow-lg  text-black h-[520px] w-[350px] rounded-lg">
            <div className=" rounded-md p-4 max-h-screen">
                <img className="rounded-lg object-cover w-[300px] h-[260px]"  alt="cars" src={image} />
            </div>
            <div className="flex justify-between pl-4 pr-4">
                <h1 className="text-3xl max-words h-12 w[50px] overflow-hidden truncate">{title}</h1>
            </div>
            <div className="grid grid-cols-2 gap-4 p-4">
                <div className="flex ">
                 <Users  className="text-blue-400"/>
                 <p className="ml-2">4 people</p>

                </div>
                <div className="flex">
                <Fuel  className="text-blue-400"/>
                 <p className="ml-2"> Hybrid</p>

                </div>
                <div className="flex">
                <Gauge className="text-blue-400" />
                <p className="ml-2">6.1km / 1-litre</p>

                </div>
                <div className="flex">
                <LifeBuoy className="text-blue-400" />
                <p className="ml-2">{start_production}</p>

                </div>

            </div>
            <div className="border-b ml-4 mr-4"></div>
            <div className="flex justify-between ml-4 mr-4 mt-4">
                <div className="flex">
                    <h1 className='text-3xl'>$440</h1><p>/ month</p>
                </div>
                <div className='flex justify-between '>
                    <button className="rounded-md p-2 bg-gray border border-blue-400"><Heart className="text-blue-400" /></button>
                    <button className="ml-2 bg-blue-500 p-2 rounded-md text-white font-bold p-2 text-xl">
                        Rent now
                    </button>
                </div>
            </div>
        </div>
    )
}