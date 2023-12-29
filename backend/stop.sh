kill -9 $(ps aux | grep 'poetry' | awk '{print $2}')
echo "schedule-memo stop..."
