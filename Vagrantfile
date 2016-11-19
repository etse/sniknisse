Vagrant.configure("2") do |config|
    config.vm.box = "ubuntu/trusty64"
    config.vm.network "forwarded_port", guest: 3000, host: 3000
    config.vm.network "private_network", ip: "192.168.33.123"

    config.vm.provider "virtualbox" do |vb|
        vb.memory = "1024"
    end

    config.vm.provision "shell", inline: <<-SHELL
        apt-get update
        wget -qO- https://deb.nodesource.com/setup_6.x | sudo bash -
        apt-get install -y nodejs postgresql postgresql-contrib postgresql-client
        sudo -u postgres createdb sniknisse
        sudo -u postgres psql -d sniknisse -c "CREATE ROLE nisse WITH PASSWORD 'nisse'"
        sudo -u postgres psql -d sniknisse -c "GRANT ALL PRIVILEGES ON DATABASE sniknisse TO nisse;"
        sudo -u postgres psql -d sniknisse -c "ALTER ROLE 'nisse' WITH LOGIN;"
        export PGPASSWORD=nisse
        psql -U nisse -h 127.0.0.1 -d sniknisse -a -f /vagrant/server/tabledefs.psql
    SHELL

    config.vm.provision "up", type: "shell", run: "always", inline: <<-SHELL
        cd /vagrant
        export DATABASE_URL=postgres://nisse:nisse@127.0.0.1:5432/sniknisse
        nodejs ./bin/www > /dev/null 2>&1 & 
    SHELL
end
