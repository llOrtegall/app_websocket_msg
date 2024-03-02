import DataTable from 'react-data-table-component'
export function App() {

  const columns = [
    {
      name: "Nombre",
      selector: row => row.Nombre
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
    }
  ]

  return (
    <div>
      <DataTable columns={columns} data={data} />
    </div>
  )
}

export default App
