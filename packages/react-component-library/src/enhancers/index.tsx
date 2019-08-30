import Components from '../components'
import withFormik from './withFormik'

const Formik: object = {
  // Enhanced components
  // ...
}

for (let key of Object.keys(Components)) {
  Formik[key] = withFormik(Components[key])
}

export { Formik, withFormik }
