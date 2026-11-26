# سوپرمارکت بوی کد

## اجرا با Docker

از داخل پوشه ی فروشگاه اجرا کنید:

```sh
docker build -t code-smell-shop .
docker run -d -p 8080:80 --name code-smell-shop code-smell-shop
```
بعد از اجرای کانتینر، فروشگاه را در [localhost:8080](http://localhost:8080/) باز کنید.