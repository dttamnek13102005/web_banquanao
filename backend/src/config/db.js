import mysql from 'mysql2/promise';
import { readFileSync } from 'fs';
import path from 'path';
import dotenv from 'dotenv';

// Kích hoạt đọc file .env
dotenv.config();

// Đọc file config.json dự phòng (Fallback)
const configPath = path.join(process.cwd(), 'src', 'config', 'config.json');
let cfg = {};
try {
    const rawConfig = JSON.parse(readFileSync(configPath, 'utf-8'));
    cfg = rawConfig.development || rawConfig;
} catch (error) {
    // Nếu không có file config.json cũng không sao, vì ta đã có .env
    cfg = {};
}

// Tạo Pool kết nối: Ưu tiên lấy từ file .env trước, nếu trống thì lấy từ config.json
const pool = mysql.createPool({
    host: process.env.DB_HOST || cfg.host || cfg.hostname || 'localhost',
    user: process.env.DB_USER || cfg.username || cfg.user || 'root',
    password: process.env.DB_PASSWORD !== undefined ? process.env.DB_PASSWORD : (cfg.password || cfg.pass || '123456'),
    database: process.env.DB_NAME || cfg.database || cfg.db || 'btapweb_v2',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Kiểm tra kết nối
pool.getConnection()
    .then((connection) => {
        console.log("Kết nối cơ sở dữ liệu thành công!");
        connection.release();
    })
    .catch((err) => {
        console.error("Lỗi kết nối cơ sở dữ liệu:", err);
    });

export default pool;