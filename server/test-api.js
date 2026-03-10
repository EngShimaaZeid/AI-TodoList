// ===================================
// Hayati API Test Script
// ===================================
// This script tests all API endpoints to ensure they work correctly

const BASE_URL = 'http://localhost:5000';

// Color codes for terminal output
const colors = {
    reset: '\x1b[0m',
    green: '\x1b[32m',
    red: '\x1b[31m',
    yellow: '\x1b[33m',
    blue: '\x1b[34m',
    cyan: '\x1b[36m'
};

// Test data
let authToken = '';
let userId = '';
let taskId = '';

const testEmail = `test_${Date.now()}@hayati.test`;
const testPassword = 'test123456';

// Helper function to make HTTP requests
async function makeRequest(method, endpoint, body = null, headers = {}) {
    const url = `${BASE_URL}${endpoint}`;

    const options = {
        method,
        headers: {
            'Content-Type': 'application/json',
            ...headers
        }
    };

    if (body) {
        options.body = JSON.stringify(body);
    }

    try {
        const response = await fetch(url, options);
        const data = await response.json();
        return { status: response.status, data };
    } catch (error) {
        return { error: error.message };
    }
}

// Test functions
async function testHealthCheck() {
    console.log(`\n${colors.cyan}=== Testing Health Check ===${colors.reset}`);
    const result = await makeRequest('GET', '/health');

    if (result.status === 200 && result.data.status === 'OK') {
        console.log(`${colors.green}✅ Health check passed${colors.reset}`);
        console.log(`   Database: ${result.data.database}`);
        console.log(`   Environment: ${result.data.environment}`);
        return true;
    } else {
        console.log(`${colors.red}❌ Health check failed${colors.reset}`);
        console.log(result);
        return false;
    }
}

async function testSignup() {
    console.log(`\n${colors.cyan}=== Testing Signup ===${colors.reset}`);
    const result = await makeRequest('POST', '/api/auth/signup', {
        name: 'Test User',
        email: testEmail,
        password: testPassword
    });

    if (result.status === 201 && result.data.token) {
        authToken = result.data.token;
        userId = result.data.userId;
        console.log(`${colors.green}✅ Signup successful${colors.reset}`);
        console.log(`   User ID: ${userId}`);
        console.log(`   Token: ${authToken.substring(0, 20)}...`);
        return true;
    } else {
        console.log(`${colors.red}❌ Signup failed${colors.reset}`);
        console.log(result);
        return false;
    }
}

async function testLogin() {
    console.log(`\n${colors.cyan}=== Testing Login ===${colors.reset}`);
    const result = await makeRequest('POST', '/api/auth/login', {
        email: testEmail,
        password: testPassword
    });

    if (result.status === 200 && result.data.token) {
        console.log(`${colors.green}✅ Login successful${colors.reset}`);
        console.log(`   User: ${result.data.name}`);
        return true;
    } else {
        console.log(`${colors.red}❌ Login failed${colors.reset}`);
        console.log(result);
        return false;
    }
}

async function testGetMe() {
    console.log(`\n${colors.cyan}=== Testing Get Current User ===${colors.reset}`);
    const result = await makeRequest('GET', '/api/auth/me', null, {
        'Authorization': `Bearer ${authToken}`
    });

    if (result.status === 200 && result.data.userId) {
        console.log(`${colors.green}✅ Get user successful${colors.reset}`);
        console.log(`   Name: ${result.data.name}`);
        console.log(`   Email: ${result.data.email}`);
        return true;
    } else {
        console.log(`${colors.red}❌ Get user failed${colors.reset}`);
        console.log(result);
        return false;
    }
}

async function testCreateTask() {
    console.log(`\n${colors.cyan}=== Testing Create Task ===${colors.reset}`);
    const result = await makeRequest('POST', '/api/tasks', {
        title: 'Test Task',
        description: 'This is a test task',
        category: 'Work',
        priority: 'Urgent & Important',
        userId: userId
    });

    if (result.status === 200 && result.data._id) {
        taskId = result.data._id;
        console.log(`${colors.green}✅ Task created${colors.reset}`);
        console.log(`   Task ID: ${taskId}`);
        console.log(`   Title: ${result.data.title}`);
        return true;
    } else {
        console.log(`${colors.red}❌ Create task failed${colors.reset}`);
        console.log(result);
        return false;
    }
}

async function testGetTasks() {
    console.log(`\n${colors.cyan}=== Testing Get Tasks ===${colors.reset}`);
    const result = await makeRequest('GET', `/api/tasks?userId=${userId}`);

    if (result.status === 200 && Array.isArray(result.data)) {
        console.log(`${colors.green}✅ Get tasks successful${colors.reset}`);
        console.log(`   Total tasks: ${result.data.length}`);
        return true;
    } else {
        console.log(`${colors.red}❌ Get tasks failed${colors.reset}`);
        console.log(result);
        return false;
    }
}

async function testUpdateTask() {
    console.log(`\n${colors.cyan}=== Testing Update Task ===${colors.reset}`);
    const result = await makeRequest('PUT', `/api/tasks/${taskId}`, {
        completed: true,
        description: 'Updated test task'
    });

    if (result.status === 200 && result.data.completed === true) {
        console.log(`${colors.green}✅ Task updated${colors.reset}`);
        console.log(`   Completed: ${result.data.completed}`);
        return true;
    } else {
        console.log(`${colors.red}❌ Update task failed${colors.reset}`);
        console.log(result);
        return false;
    }
}

async function testCompleteTask() {
    console.log(`\n${colors.cyan}=== Testing Complete Task (User History) ===${colors.reset}`);
    const result = await makeRequest('POST', `/api/users/${userId}/tasks/complete`, {
        task: {
            id: taskId,
            title: 'Test Task',
            category: 'work',
            priority: 'high'
        }
    });

    if (result.status === 200 && result.data.message) {
        console.log(`${colors.green}✅ Task marked complete in history${colors.reset}`);
        console.log(`   Message: ${result.data.message}`);
        return true;
    } else {
        console.log(`${colors.red}❌ Complete task failed${colors.reset}`);
        console.log(result);
        return false;
    }
}

async function testGetTaskHistory() {
    console.log(`\n${colors.cyan}=== Testing Get Task History ===${colors.reset}`);
    const result = await makeRequest('GET', `/api/users/${userId}/tasks/history`);

    if (result.status === 200 && result.data.taskHistory) {
        console.log(`${colors.green}✅ Get task history successful${colors.reset}`);
        console.log(`   Total completed: ${result.data.taskStats?.totalCompleted || 0}`);
        return true;
    } else {
        console.log(`${colors.red}❌ Get task history failed${colors.reset}`);
        console.log(result);
        return false;
    }
}

async function testDeleteTask() {
    console.log(`\n${colors.cyan}=== Testing Delete Task ===${colors.reset}`);
    const result = await makeRequest('DELETE', `/api/tasks/${taskId}`);

    if (result.status === 200) {
        console.log(`${colors.green}✅ Task deleted${colors.reset}`);
        return true;
    } else {
        console.log(`${colors.red}❌ Delete task failed${colors.reset}`);
        console.log(result);
        return false;
    }
}

// Main test runner
async function runAllTests() {
    console.log(`${colors.blue}╔═══════════════════════════════════════╗${colors.reset}`);
    console.log(`${colors.blue}║   Hayati API Test Suite              ║${colors.reset}`);
    console.log(`${colors.blue}╚═══════════════════════════════════════╝${colors.reset}`);
    console.log(`\nTesting API at: ${BASE_URL}`);

    const tests = [
        { name: 'Health Check', fn: testHealthCheck },
        { name: 'Signup', fn: testSignup },
        { name: 'Login', fn: testLogin },
        { name: 'Get Current User', fn: testGetMe },
        { name: 'Create Task', fn: testCreateTask },
        { name: 'Get Tasks', fn: testGetTasks },
        { name: 'Update Task', fn: testUpdateTask },
        { name: 'Complete Task', fn: testCompleteTask },
        { name: 'Get Task History', fn: testGetTaskHistory },
        { name: 'Delete Task', fn: testDeleteTask }
    ];

    let passed = 0;
    let failed = 0;

    for (const test of tests) {
        try {
            const result = await test.fn();
            if (result) {
                passed++;
            } else {
                failed++;
            }
        } catch (error) {
            console.log(`${colors.red}❌ ${test.name} threw an error: ${error.message}${colors.reset}`);
            failed++;
        }
    }

    // Summary
    console.log(`\n${colors.blue}╔═══════════════════════════════════════╗${colors.reset}`);
    console.log(`${colors.blue}║   Test Summary                        ║${colors.reset}`);
    console.log(`${colors.blue}╚═══════════════════════════════════════╝${colors.reset}`);
    console.log(`${colors.green}✅ Passed: ${passed}${colors.reset}`);
    console.log(`${colors.red}❌ Failed: ${failed}${colors.reset}`);
    console.log(`Total: ${passed + failed}\n`);

    if (failed === 0) {
        console.log(`${colors.green}🎉 All tests passed!${colors.reset}\n`);
        process.exit(0);
    } else {
        console.log(`${colors.yellow}⚠️  Some tests failed. Check the output above.${colors.reset}\n`);
        process.exit(1);
    }
}

// Check if server is running
async function checkServer() {
    try {
        const response = await fetch(BASE_URL);
        return true;
    } catch (error) {
        console.log(`${colors.red}❌ Cannot connect to server at ${BASE_URL}${colors.reset}`);
        console.log(`${colors.yellow}Make sure the server is running with: npm start${colors.reset}\n`);
        process.exit(1);
    }
}

// Run tests
(async () => {
    await checkServer();
    await runAllTests();
})();
