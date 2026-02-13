// roleCheck.js

function roleCheck(allowedRoles) {
    return function(req, res, next) {
        const userRole = req.user.role; // Assuming req.user is set after authentication
        
        if (allowedRoles.includes(userRole)) {
            return next(); // User has the correct role
        }
        
        return res.status(403).json({ message: 'Access denied: insufficient permissions' });
    };
}

module.exports = roleCheck;