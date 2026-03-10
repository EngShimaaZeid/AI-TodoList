const mongoose = require('mongoose');
require('dotenv').config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/hayati';

console.log('🔍 Testing Database Connection...\n');
console.log('Connection String:', MONGODB_URI.replace(/\/\/.*:.*@/, '//***:***@')); // Hide credentials

mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => {
        console.log('\n✅ SUCCESS! MongoDB Connected');
        console.log(`📊 Database Name: ${mongoose.connection.name}`);
        console.log(`🌍 Host: ${mongoose.connection.host}`);
        console.log(`📡 Port: ${mongoose.connection.port}`);
        console.log(`✅ Ready State: ${mongoose.connection.readyState === 1 ? 'Connected' : 'Not Connected'}`);

        // List collections
        mongoose.connection.db.listCollections().toArray()
            .then(collections => {
                console.log(`\n📁 Collections (${collections.length}):`);
                if (collections.length === 0) {
                    console.log('   (No collections yet - they will be created on first use)');
                } else {
                    collections.forEach(col => {
                        console.log(`   - ${col.name}`);
                    });
                }

                console.log('\n🎉 Database test completed successfully!');
                process.exit(0);
            })
            .catch(err => {
                console.error('Error listing collections:', err);
                process.exit(1);
            });
    })
    .catch(err => {
        console.error('\n❌ FAILED! MongoDB Connection Error');
        console.error('Error:', err.message);

        console.log('\n📋 Troubleshooting Tips:');
        console.log('1. Make sure MongoDB is installed and running');
        console.log('   - Windows: Check if "MongoDB" service is running');
        console.log('   - Command: Get-Service -Name MongoDB');
        console.log('');
        console.log('2. Verify MongoDB is listening on the correct port');
        console.log('   - Default port: 27017');
        console.log('   - Command: netstat -ano | findstr :27017');
        console.log('');
        console.log('3. Check your .env file configuration');
        console.log('   - File: server/.env');
        console.log('   - Variable: MONGODB_URI');
        console.log('');
        console.log('4. If using MongoDB Atlas (cloud):');
        console.log('   - Verify connection string is correct');
        console.log('   - Check IP whitelist settings');
        console.log('   - Verify database user credentials');
        console.log('');
        console.log('5. Install MongoDB if not installed:');
        console.log('   - Visit: https://www.mongodb.com/try/download/community');
        console.log('   - Or use MongoDB Atlas (free cloud): https://www.mongodb.com/cloud/atlas');

        process.exit(1);
    });
