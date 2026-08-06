import os
p = 'app/portal/login/page.tsx'
with open(p) as f: c = f.read()
old = 'await login("dev:rolandhodavid@gmail.com");'
new = ('// INT-010: dev credential is env-driven (NEXT_PUBLIC_DEV_LOGIN_EMAIL in\n'
       '      // gitignored .env.local) — never hardcode real emails in the repo.\n'
       '      await login(`dev:${process.env.NEXT_PUBLIC_DEV_LOGIN_EMAIL || "sandbox@example.invalid"}`);')
assert old in c, 'dev credential not found — already scrubbed?'
c = c.replace(old, new, 1)
with open(p, 'w') as f: f.write(c)
with open('.env.local') as f: env = f.read()
if 'NEXT_PUBLIC_DEV_LOGIN_EMAIL' not in env:
    with open('.env.local', 'a') as f:
        f.write('\n# INT-010: local-only dev login (gitignored)\nNEXT_PUBLIC_DEV_LOGIN_EMAIL=rolandhodavid@gmail.com\n')
print('✔ scrubbed: dev credential now env-driven, PII out of source')
