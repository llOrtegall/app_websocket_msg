import { useState } from 'react'
import DataTable from 'react-data-table-component'
export function App() {
  const columns = [
    {
      name: "Nombre",
      selector: row => row.Nombre,
      sortable: true
    },
    {
      name: "Apellido",
      selector: row => row.Apellido
    },
    {
      name: "Edad",
      selector: row => row.Edad
    }
  ]

  const data = [
    {
      Nombre: "Juan",
      Apellido: "Perez",
      Edad: 30
    },
    {
      Nombre: "Maria",
      Apellido: "Gomez",
      Edad: 25
    },
    {
      Nombre: "Carlos",
      Apellido: "Lopez",
      Edad: 40
    },
    {
      Nombre: "Sebastian",
      Apellido: "Castro",
      Edad: 25
    },
    {
      Nombre: "Ana",
      Apellido: "Salazar",
      Edad: 56
    },
    {
      Nombre: "Juan",
      Apellido: "Perez",
      Edad: 30
    },
    {
      Nombre: "Maria",
      Apellido: "Gomez",
      Edad: 25
    },
    {
      Nombre: "Carlos",
      Apellido: "Lopez",
      Edad: 40
    },
    {
      Nombre: "Sebastian",
      Apellido: "Castro",
      Edad: 25
    },
    {
      Nombre: "Ana",
      Apellido: "Salazar",
      Edad: 56
    },
    {
      Nombre: "Juan",
      Apellido: "Perez",
      Edad: 30
    },
    {
      Nombre: "Maria",
      Apellido: "Gomez",
      Edad: 25
    },
    {
      Nombre: "Carlos",
      Apellido: "Lopez",
      Edad: 40
    },
    {
      Nombre: "Sebastian",
      Apellido: "Castro",
      Edad: 25
    },
    {
      Nombre: "Ana",
      Apellido: "Salazar",
      Edad: 56
    },    {
      Nombre: "Juan",
      Apellido: "Perez",
      Edad: 30
    },
    {
      Nombre: "Maria",
      Apellido: "Gomez",
      Edad: 25
    },
    {
      Nombre: "Carlos",
      Apellido: "Lopez",
      Edad: 40
    },
    {
      Nombre: "Sebastian",
      Apellido: "Castro",
      Edad: 25
    },
    {
      Nombre: "Ana",
      Apellido: "Salazar",
      Edad: 56
    },
    {
      Nombre: "Juan",
      Apellido: "Perez",
      Edad: 30
    },
    {
      Nombre: "Maria",
      Apellido: "Gomez",
      Edad: 25
    },
    {
      Nombre: "Carlos",
      Apellido: "Lopez",
      Edad: 40
    },
    {
      Nombre: "Sebastian",
      Apellido: "Castro",
      Edad: 25
    },
    {
      Nombre: "Ana",
      Apellido: "Salazar",
      Edad: 56
    },
    {
      Nombre: "Juan",
      Apellido: "Perez",
      Edad: 30
    },
    {
      Nombre: "Maria",
      Apellido: "Gomez",
      Edad: 25
    },
    {
      Nombre: "Carlos",
      Apellido: "Lopez",
      Edad: 40
    },
    {
      Nombre: "Sebastian",
      Apellido: "Castro",
      Edad: 25
    },
    {
      Nombre: "Ana",
      Apellido: "Salazar",
      Edad: 56
    },
    {
      Nombre: "Juan",
      Apellido: "Perez",
      Edad: 30
    },
    {
      Nombre: "Maria",
      Apellido: "Gomez",
      Edad: 25
    },
    {
      Nombre: "Carlos",
      Apellido: "Lopez",
      Edad: 40
    },
    {
      Nombre: "Sebastian",
      Apellido: "Castro",
      Edad: 25
    },
    {
      Nombre: "Ana",
      Apellido: "Salazar",
      Edad: 56
    },    {
      Nombre: "Juan",
      Apellido: "Perez",
      Edad: 30
    },
    {
      Nombre: "Maria",
      Apellido: "Gomez",
      Edad: 25
    },
    {
      Nombre: "Carlos",
      Apellido: "Lopez",
      Edad: 40
    },
    {
      Nombre: "Sebastian",
      Apellido: "Castro",
      Edad: 25
    },
    {
      Nombre: "Ana",
      Apellido: "Salazar",
      Edad: 56
    }
  ]

  const [records, setRecords] = useState(data)

  const handleChanged = (e) => {
      const filteredRecors = data.filter(record => {
        return record.Nombre.toLowerCase().includes(e.target.value.toLowerCase())
      })

      setRecords(filteredRecors)
  } 

  return (
    <div>

      <input type="text" onChange={handleChanged}/>

      <DataTable 
        columns={columns} 
        data={records} 
        selectableRows 
        // paginationPerPage={4}
        pagination
        fixedHeader
      />  
    </div>
  )
}

export default App
