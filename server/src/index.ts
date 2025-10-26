import express from 'express';
import cors from 'cors';
import LogReg from './Routes/RegLog';
import helmet from "helmet";
import MainPage from './Routes/MainPage';
import Profile from './Routes/Profile';
import Post from './Routes/Post';
import PostPage from './Routes/PostPage';
import errorHandle from './utils/errorHandle';
import Channels from './Routes/Channels';

const app = express();
app.use(helmet());
app.use(express.json());

const allowedOrigins = ['https://dantway.pl', 'http://localhost:5173'];

app.use(cors({
  origin: function(origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      console.log('Blocked by CORS:', origin);
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET','POST','OPTIONS','DELETE','PUT'],
  allowedHeaders: ['Content-Type', 'Authorization','token'],
  credentials: true
}));

app.options('*', cors());

app.use('/', LogReg());

app.use('/', MainPage());
app.use('/profile', Profile());

app.use('/profile/post',Post());
app.use('/post',PostPage());
app.use('/channels',Channels());

app.use(errorHandle);
const PORT = 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
