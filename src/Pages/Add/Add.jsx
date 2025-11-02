import { useEffect, useState,useContext } from "react"
import {assets} from "../../assets/asssets.js"
import { toast } from "react-toastify"
import axios from "axios"
import "./Add.css"


 const Add=(props)=>{
    const [name,setName]=useState('')
    const [price,setPrice]=useState("")
    const [desc,setDesc]=useState('')
    const [category,setCategory]=useState("")

    const [image1,setImage1]=useState()
    const [image2,setImage2]=useState()
    const [image3,setImage3]=useState()
    const [image4,setImage4]=useState()


    const handlesubmit=async(e)=>{
        e.preventDefault()


        if(!image1 && !image2 && !image3 && !image4){
            toast.error("atleat one image")
            return 
        }
        try {
            const formdata= new FormData()
            formdata.append("name",name)
            formdata.append("price",price)
            formdata.append('desc',desc)
            formdata.append('category', category)

            if(image1){
                formdata.append("image1",image1)
            }
            if(image2){
                formdata.append("image2",image2)
            }
            if(image3){
                formdata.append("image3",image3)
            }
            if(image4){
                formdata.append("image4",image4)
            }

            

            const response=await axios.post("http://localhost:4000/products/upload",formdata, { headers: { "Content-Type": "multipart/form-data" } })

            if(response){
                setCategory('')
                setDesc('')
                setImage1(null)
                setImage2(null)
                setImage3(null)
                setImage4(null)
                setName('')
                setPrice('')
                toast.success(response.data.message)
            }else{
                console.log(response.data.message)
                return toast.error("product upload failed.")
            }
        } catch (e) {
          console.log(e)
        }
    }

    return (<form onSubmit={handlesubmit} className="add">
        <div className="imageupload">
            <label htmlFor="image1" className="image">
                <input type="file" id="image1" hidden onChange={(e)=>setImage1(e.target.files[0])} />
                <img id="image1" src={!image1 ? assets.upload : URL.createObjectURL(image1)} />
            </label>
              <label htmlFor="image2" className="image">
                <input type="file" id="image2" hidden onChange={(e)=>setImage2(e.target.files[0])} />
                <img id="image2" src={!image2 ? assets.upload : URL.createObjectURL(image2)} />
            </label>
              <label htmlFor="image3" className="image">
                <input type="file" id="image3" hidden onChange={(e)=>setImage3(e.target.files[0])} />
                <img id="image3" src={!image3 ? assets.upload : URL.createObjectURL(image3)} />
            </label>
              <label htmlFor="image4" className="image">
                <input type="file" id="image4" hidden onChange={(e)=>setImage4(e.target.files[0])} />
                <img id="image4" src={!image4 ? assets.upload : URL.createObjectURL(image4)} />
            </label>
        </div>
        <div className="nameprice">
            <div className="name">
                <label>Name</label>
            <input type="text" value={name} placeholder="name of product" onChange={(e)=>setName(e.target.value)}/>
            </div>
             <div className="name">
                <label>price</label>
            <input type="text" value={price} placeholder="price" onChange={(e)=>setPrice(e.target.value)}/>
            </div>
        </div>
        <textarea value={desc} onChange={(e)=>setDesc(e.target.value)} placeholder="productdescription"></textarea>
        <select value={category} onChange={(e)=>setCategory(e.target.value)}>
            <option value="">Selevt category.</option>
            <option value={"shoe"}>shoe</option>
            <option value={"shirt"}>Shirt</option>
            <option value={"trouser"}>Trouser</option>
        </select>

        <button>Submit</button>
    </form>)
}


export default Add