document.addEventListener('DOMContentLoaded', function() {
	
    const searchBtn = document.getElementById('searchBtn');
    const verifyBtn = document.getElementById('verifyBtn');
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');
    const progressContainer = document.getElementById('progressContainer');
    const progressBar = document.getElementById('progressBar');
    const searchingText = document.getElementById('searchingText');
    const userDisplay = document.getElementById('userDisplay');
    const displayName = document.getElementById('displayName');
    const errorMessage = document.getElementById('errorMessage');
    const successMessage = document.getElementById('successMessage');
    const infoMessage = document.getElementById('infoMessage');
    const fileLink = document.getElementById('fileLink');
    const downloadLink = document.getElementById('downloadLink');
    // Admin ලින්ක් එක පෙන්වන්න
const adminLink = document.getElementById('adminLink');
adminLink.style.display = 'inline-block';
    let currentUser = null;
	

// Admin ලින්ක් එකට ඇඩ්මින් පැස්වර්ඩ් එක අවශ්ය කරන්න

        adminLink.addEventListener('click', (e) => {
	 e.preventDefault();
    const password = prompt('Enter Admin Password:');
    if (password === 'Janitha@22') {// ඔබේ ඇඩ්මින් පැස්වර්ඩ් එක මෙතන යොදන්න
	   window.location.href = 'admin.html';
       
     } else {
        alert('Incorrect admin password! Access denied.');
    }
});
    
    // Search Button Event
    searchBtn.addEventListener('click', handleSearch);
    
    // Verify Button Event
    verifyBtn.addEventListener('click', handleVerify);
    
    // Enter Key Support
    usernameInput.addEventListener('keypress', e => e.key === 'Enter' && handleSearch());
    passwordInput.addEventListener('keypress', e => e.key === 'Enter' && handleVerify());

    function handleSearch() {
        const username = usernameInput.value.trim();
        
        if (!username) {
            showMessage(errorMessage, 'Please enter your Username', true);
            return;
        }
        
        searchBtn.disabled = true;
        searchingText.style.display = 'block';
        progressContainer.style.display = 'block';
        
        let progress = 0;
        const interval = setInterval(() => {
            progress += 2;
            progressBar.style.width = `${progress}%`;
            
            if (progress >= 100) {
                clearInterval(interval);
                processSearch(username);
            }
        }, 40);
    }

    function processSearch(username) {
        setTimeout(() => {
            searchingText.style.display = 'none';
            progressContainer.style.display = 'none';
            progressBar.style.width = '0%';
            
            currentUser = userDatabase.find(user => 
                user.Name.toLowerCase() === username.toLowerCase()
            );
            
            if (currentUser) {
                displayName.textContent = currentUser.Name;
                userDisplay.style.display = 'block';
                usernameInput.disabled = true;
                searchBtn.disabled = false;
            } else {
                showMessage(errorMessage, 'User account not found, please try again', true);
                searchBtn.disabled = false;
            }
        }, 500);
    }

    function handleVerify() {
        const password = passwordInput.value.trim();
        
        if (!password) {
            showMessage(errorMessage, 'Please enter the password', true);
            return;
        }
        
        if (!currentUser) {
            showMessage(errorMessage, 'User data not found. Please check again or contact our customer service', true);
            return;
        }
        
        if (currentUser.Password === password) {
            if (currentUser.fileLink) {
                downloadLink.href = currentUser.fileLink;
                fileLink.style.display = 'block';
                showMessage(successMessage, 'Password successfully verified!', false);
            } else {
                showMessage(infoMessage, 'The file link has not been created yet.', false);
            }
        } else {
            showMessage(errorMessage, 'Incorrect password.', true);
        }
    }

    function showMessage(element, text, isError) {
        errorMessage.style.display = 'none';
        successMessage.style.display = 'none';
        infoMessage.style.display = 'none';
        
        element.textContent = text;
        element.style.display = 'block';
        
        setTimeout(() => {
            element.style.display = 'none';
        }, 5000);
    }
});