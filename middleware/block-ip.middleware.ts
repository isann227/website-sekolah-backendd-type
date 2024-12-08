import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

// Daftar alamat IP yang ingin Anda blokir
// const blockedIPs = ['127.0.0.1', '192.168.1.1', '::1'];
const blockedIPs = ['127.0.0.1', '192.168.1.1'];

@Injectable()
export class BlockIPMiddleware implements NestMiddleware {
  
  
  use(req: Request, res: Response, next: NextFunction) {

    // const rateLimitLimit = req.get('X-RateLimit-Limit');
    const rateLimitRemaining = req.get('X-RateLimit-Remaining');
    // const rateLimitReset = req.get('X-RateLimit-Reset');
    const rateLimitRemaining2 = req.headers['X-RateLimit-Remaining'];

    // console.log(rateLimitRemaining2)
    if (rateLimitRemaining !== undefined) {
    // console.log(rateLimitRemaining);
      // return `Rate Limit Remaining: ${rateLimitRemaining}`;
    } else {
      // console.log('a')
      // return 'RateLimit-Remaining header not found.';
    }


    // const rateLimitLimit = req.get('X-RateLimit-Limit');
    // const rateLimitRemaining = req.get('X-RateLimit-Remaining');
    // const rateLimitReset = req.get('X-RateLimit-Reset');

    // const limit =  {
    //   limit: rateLimitLimit,
    //   remaining: rateLimitRemaining,
    //   reset: rateLimitReset,
    // };
    // console.log(rateLimitLimit, rateLimitRemaining, rateLimitReset)


    const clientIP = req.ip; // Mendapatkan alamat IP klien dari permintaan

    if (blockedIPs.includes(clientIP)) {
      // Jika alamat IP terdapat dalam daftar yang diblokir, kirim respons pemblokiran
      console.log('Access denied for your IP address.');
      return res.status(403).json({ message: 'Access denied for your IP address.' });
      // return res.status(403).json({ message: 'Access denied for your IP address.' });
    }

    // Lanjutkan dengan middleware atau fungsi berikutnya jika tidak diblokir
    next();
  }
}