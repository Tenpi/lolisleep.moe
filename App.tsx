import React, {useEffect} from "react"
import {Switch, Route} from "react-router-dom"
import LoliSleep from "./components/LoliSleep"
import $404 from "./components/404"
import functions from "./structures/functions"

const App: React.FunctionComponent = () => {
  useEffect(() => {
    functions.preventDragging()
    functions.dragScroll(true)
  }, [])

  return (
    <div className="app" onTouchStart={() => ""}>
      <Switch>
        <Route exact path={["/", "/home", "/index", "index.html"]}><LoliSleep/></Route>
        <Route path="*"><$404/></Route>
      </Switch>
    </div>
  )
}

export default App