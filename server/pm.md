npm install -g pm2
npm install pm2-windows-startup -g
pm2-startup install


pm2 start index.js --name "path-to-success"


Command	              Description
pm2 list	                List all running processes
pm2 restart <app_name>	    Restart the app (e.g., pm2 restart react-express-server)
pm2 stop <app_name>	        Stop the app
pm2 delete <app_name>	    Remove from PM2
pm2 logs	                Show logs in real-time
pm2 monit	                Monitor CPU/memory usage
pm2 save	                Save current processes to auto-restart on reboot
pm2 startup	                Generate a startup script (for server reboots)