import React, { useState, useEffect } from 'react';
import data from './Data.json';
import './select.css';

//  let newarr = data.map(element => element.referData[0].Name);
//  console.log(newarr);

// var count =data.map(newdata=>newdata.referData+"");
// console.log(count);

// var option = data.map(newlength => newlength.referData.length);
// console.log(option);

const arr = data.map(element => element.name);

function Dropdown() {
    const [rdata, setRdata] = useState<{ name: string; referData: { Name: string; email: string; }[]; }[]>(data);
    
    const [userdata, setUserdata] = useState<{
        "name": string,
        "referData": any
    }>({
        "name": "",
        "referData": []
    });
    const[valid,setValid]=useState("");
    const [present, setPresent] = useState("");
    useEffect(()=>{
        setCount(userdata.referData.length) 
        console.log("working")
    },[userdata,rdata])  
    
    useEffect(() => {
        var mainrec = rdata.find((d: any) => d.name == present);
        if (mainrec) {
            setUserdata(mainrec)
        } 
    },[rdata])


    const [count, setCount] = useState();
    const selectHandler = (e: any) => {
        setPresent(e);
        var mainrec = rdata.find((d: any) => d.name == e);

        if (mainrec)
            setUserdata(mainrec)
    }
    const [additem,setAdditem]=useState<{ 
        "Name": string,
        "email": any,
       
    }>({Name:"",email:""})

    const handleChange=(e:any)=>{  
        e.preventDefault();  

        const newInput = (newitem:any)=>({...newitem, [e.target.name]:e.target.value})
        setAdditem(newInput)
    }
    
     
    const handleSubmit=(event:any)=> {
        event.preventDefault();

        // console.log('A name and email was submitted: ' + additem.Name,additem.email);
        const { Name,email} = additem;    
        const newdata = {
            Name:Name,
            email:email
        };
        setRdata(rdata.map((item) => { 
            
            if(item.name == userdata.name && newdata){ 
                // (item.referData.push(newdata))
                // console.log("newitem",newdata)
                let results = item.referData.find((refD)=>{
                    return refD.Name==newdata.Name
                }) 
                let result1 = item.referData.find((refD)=>{
                    return refD.email==newdata.email
                } )  
               
                   
                if(!results && !result1){
                    item.referData.push(newdata)
                    setValid('A name and email was submitted');
                    return(item)
                }
                else if(!results){
                    setValid("email is alreay exist")
                }
                else if(!result1){
                    setValid("name is already exist")
                }
                else{
                    setValid("both  are already exists")
                }
                return item;
            }
            else
            {
                return item
            }

        }))
        // userdata.referData.push(newdata)
        // setUserdata({...userdata})
    }  
           
    return (
        <div className='scrollbar'>

            <select onChange={(e) => selectHandler(e.target.value)}>

                <option value="" ></option>
                {arr.map((option, i) => (
                    <option key={i} value={option}>
                        {option}
                    </option>
                ))}
            </select>


            <div className='summery'>
                <h4>  Referral summary</h4>
                <textarea value={count}>
                </textarea>

            </div>
            <h3>  Referral Data</h3>
            <div className='table'>
               
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                        </tr>

                    </thead>
                    <tbody>
                        {userdata.referData.map((val :any, key:any) => {
                            return (
                                <tr key={key}>
                                    <td>{val.Name}</td>
                                    <td>{val.email}</td>
                                </tr>
                            )
                        })}

                    </tbody>
                </table>
            </div>

            
             <div className='update' >
                 <form  onSubmit={handleSubmit} >
                          <input type="text" name='Name'placeholder='Name' value={additem.Name}  onChange={handleChange} required></input>
                          <input type="email" name='email'placeholder='enter your mail' value={additem.email} onChange={handleChange} required></input> 
                          <br></br>
                          <button  type='submit' >AddItem</button>
                          <div id='valid'><textarea value={valid}></textarea> </div>
                 </form>         
                 </div>
                 
        </div>
    )
}

export default Dropdown;


// if (!results){
//     // item.referData.push(newdata)
// } else{
//     console.log('name is already exists')
// }
// if(!result1){
//     // item.referData.push(newdata)
// }else{
//     console.log('email is already exists')
// }

// const handleAddCountry=(rdata)=>{
    //     if(additem.some(item=>item.userdata===item.newdata)) {
    //         window.alert ("you have already added this country");
    //         return;
    //     }
    //     setAdditem([...addSyntheticTrailingComment,rdata])
    // }setValid('A name and email was submitted: ' +( additem.Name,additem.email));