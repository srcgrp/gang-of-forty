# ناردونه

## اجرا با Docker

Docker را روشن کن و از پوشهٔ `shops/semver` این دستورها را اجرا کن.

```powershell
docker build -t semver-shop .
docker run -d -p 8080:80 --name shop semver-shop
```

در مرورگر `http://localhost:8080` را باز کن. برای بررسی API، نشانی `http://localhost:8080/api/products.json` را باز کن و ببین فهرست محصولات به‌صورت JSON برمی‌گردد.
