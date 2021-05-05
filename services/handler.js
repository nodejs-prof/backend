const handler = (lambda) => {

    return (req, res) => {

        const X_HADER = 'sample header'

        return lambda(req, res, X_HADER)

    }

}


export {handler}