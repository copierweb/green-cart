import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import AppError from './error/appError.js';
import globalErrorHandler from './middlewares/globalErrorHandler.js';
import userRouter from './routes/userRoutes.js'
import sellerRouter from './routes/sellerRoutes.js'
import productRouter from './routes/productRoutes.js'
import cartRouter from './routes/cartRoutes.js'
import addressRouter from './routes/addressRoutes.js'
import orderRouter from './routes/orderRoutes.js'

// ----------------------------------------------------------------------
const app = express()
const allowedOrigins = process.env.ALLOWED_ORIGINS.split(',')

// ------------------------------------------------------
// middlewares
app.use(cors({ origin: allowedOrigins, credentials: true })) // credentials: true //when we need authintication cookies and etc...
app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({ extended: true}))

// -----------------------------------------------------
//========= routes ========= //

app.use('/api/v1/users', userRouter)
app.use('/api/v1/seller', sellerRouter)
app.use('/api/v1/product', productRouter)
app.use('/api/v1/cart', cartRouter)
app.use('/api/v1/address', addressRouter)
app.use('/api/v1/order', orderRouter)

app.get('/', ((req,res) => {

	res.status(200).json({
		status: 'success',
		message: 'checking server',
	})

}))

// ---------------------------------------------------------
// handling unhandled routes
app.all("/{*any}", (req, res, next) => {

	next( new AppError (`cant find ${req.originalUrl} on the server`, 404))
})

// ---------------------------------------------------------
// global error handling middleware
app.use(globalErrorHandler)

export default app

// req