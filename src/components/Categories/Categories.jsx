import axios from "axios"
import { useEffect, useState } from "react"
import './Categories.css'
import { useCategory } from "../../context";

export const Categories = () => {

    const [categories, setCategories] = useState([]);
    const [numberOfCategoriesToShow, setNumberofCategoriesToShow] = useState(0);
    const {hotelCategory,setHotelCategory}=useCategory();

    const handleShowMoreRightClick=()=>{
        setNumberofCategoriesToShow((prev)=>prev+10);
    }

    const handleShowMoreLeftClick=()=>{
        setNumberofCategoriesToShow((prev)=>prev-10);
    }

    useEffect(() => {
        (async () => {
            try {
                const { data } = await axios.get('http://localhost:3500/api/categories');
                const categoriesToShow = data.slice(
                    numberOfCategoriesToShow+10>data.length ? data.length-10 : numberOfCategoriesToShow,
                    numberOfCategoriesToShow>data.length?data.length:numberOfCategoriesToShow+10
                );
                // console.log(data);
                setCategories(categoriesToShow);
            }
            catch (err) {
                console.log(err);
            }
        })()

    }, [numberOfCategoriesToShow])

    const handleCategoryClick=(category)=>{
        setHotelCategory(category);
        // console.log(category)
    }
    console.log({"hotelCategory":hotelCategory})
    return (
        <section className="categories d-flex align-center gap-large cursor-pointer">

            {numberOfCategoriesToShow >=10 &&(
            <button className="button btn-category btn-left fixed cursor-pointer"onClick={handleShowMoreLeftClick}>
                <span className="material-icons">chevron_left</span>
            </button>)
            }

            {
                
                categories && categories.map(({_id,category})=>(
                <span className={`${category=== hotelCategory ? "border-bottom":""}`}key={_id} onClick={()=>handleCategoryClick(category)}>{category}</span>
            
            ))} 
            {numberOfCategoriesToShow-10 < categories.length && (
                 <button className="button btn-category btn-right fixed cursor-pointer" onClick={handleShowMoreRightClick}>
                <span className="material-icons">chevron_right</span> 
                </button>
            )}
           

        </section>
    )
}