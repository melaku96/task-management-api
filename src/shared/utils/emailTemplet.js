
export const verifyEmailTemplate = (link) => {
  return `<div style="font-family: Arial; text-align: center;">
    <h2>Welcome 🎉</h2>
    <p>Please verify your email to continue</p>
    
    <a href="${link}" 
       style="
         display: inline-block;
         padding: 10px 20px;
         background: #4CAF50;
         color: white;
         text-decoration: none;
         border-radius: 5px;
       ">
       Verify Email
    </a>

    <p>If you didn’t create this account, ignore this email.</p>
  </div>`
};