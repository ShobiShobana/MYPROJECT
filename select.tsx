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
    
    // if(data.length > 0){
    //     setRdata(data);
    // }

    const [userdata, setUserdata] = useState<{
        "name": string,
        "referData": any
    }>({
        "name": "",
        "referData": []
    });

    const [present, setPresent] = useState();

    useEffect(()=>{
        setCount(userdata.referData.length) 
    },[userdata])   
    useEffect(() => {
        setCount(userdata.referData.length) 
    },[rdata])

    useEffect(() => {
        var mainrec = rdata.find((d: any) => d.name == present);
        if (mainrec)
            setUserdata(mainrec)
    },[rdata]) 

    const [count, setCount] = useState();
    const selectHandler = (e: any) => {
        setPresent(present);
        var mainrec = rdata.find((d: any) => d.name == e);
        if (mainrec)
            setUserdata(mainrec)
            // setPresent(present)
    }
    const [additem,setAdditem]=useState<{ 
        "Name": string,
        "email": any
    }>({Name:"",email:""})

    const handleChange=(e:any)=>{  
        e.preventDefault();

        const newInput = (newitem:any)=>({...newitem, [e.target.name]:e.target.value})
        setAdditem(newInput)
    }
    const handleSubmit=(event:any)=> {
        event.preventDefault();

        console.log('A name and email was submitted: ' + additem.Name,additem.email);
        const { Name,email} = additem;    
        const newdata = {
            Name:Name,
            email:email
        };
        setRdata(rdata.map((item) => {
            if(item.name == userdata.name && newdata){
                item.referData.push(newdata)
                return item
            }else{
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
               

                <table >
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
                                    <td></td>
                                </tr>
                            )
                        })}

                    </tbody>
                </table>
            </div>

            
             <div className='update' >
                 <form  onSubmit={handleSubmit} >
                          <input type="text" name='Name'placeholder='Name' value={additem.Name}  onChange={handleChange}></input>
                          <input type="email" name='email'placeholder='enter your mail' value={additem.email} onChange={handleChange}></input> 
                          <br></br>
                          <button  type='submit' >AddItem</button>
                 </form>         
                 </div>
                 <div className='adddata' >
                        
                 </div>
        </div>

    )
}
export default Dropdown;


//  data.map((update)=>{
        //      if(update.name==userdata.name){
        //          update.referData.push({ "Name":user.Name,
        //          "email":user.email})
        //      }
        //  }) 

        //  fs.writeFile('./Data.json', JSON.stringify(data), (err) => {
        //     if (err) console.log('Error writing file:', err);
        // })
        // const newdata={
        //     Name:user.Name,
        //     email:user.email
        // }
        // const newdatas={...additem,newdata}
        // setAdditem(newdatas)

        //     const [tableData, setTableData] = useState([data])
//     const [formInputData, setformInputData] = useState(
//      {
//      Name:'',
//      email:''
//     }
//  );
//  const { Name, email } = formInputData;
//  const handleChange=(e:any)=>{  
//      const newInput = (newitem:any)=>({...newitem, [e.target.name]:e.target.value})
//     setformInputData(newInput)
//  }
  
//  const handleSubmit= (e:any) =>{
//      e.preventDefault();
//      const checkEmptyInput = !Object.values(formInputData).every(res=>res==="")
//      if(checkEmptyInput)
//      {
//       const newData = (newitem:any)=>({...newitem, formInputData})
//       setTableData(newData);
//       const emptyInput= {Name:'', email:''}
//       setformInputData(emptyInput)
//      }
//  }  
    
    // const [additem,setAdditem]=useState()
    // const [user, setUser] = useState({
    //     Name: "",
    //     email: "",
    //   });
    //   const { Name, email } = user;
    //   const handleChange = (e:any) => {
    //     const { name, value } = e.target;
    //     setUser({
    //       ...user,
    //       [name]: value,
    //     });
    //   };
   
    //   const handleSubmit = (e:any) => { 
    //     e.preventDefault();
    //     console.log("Submitted");
    //     console.log(user);
    //   };