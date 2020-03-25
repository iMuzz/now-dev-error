import { compose } from 'ramda'

import { withApollo } from '../lib/apollo'

const page = compose(withApollo)

export default page
