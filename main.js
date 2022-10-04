const { createApp } = Vue

createApp({
    data() {
        return {
            input: 'https://github.com/varunkumarmedam/beta_chat_bot',
            repos: [],
            activeRepo: {
                branches: null,
                metadata: null,
                issues: null
            }
        };
    },
    mounted() {
        console.log("mounted")
    },
    methods: {
        async search() {
            const keys = this.input.split("/")
            const repo_metadata = await fetch(`https://api.github.com/repos/${keys[3]}/${keys[4]}`).then((res) => res.json())
            if (this.repos.filter((repo) => repo.html_url == repo_metadata.html_url).length == 0)
                this.repos.push(repo_metadata)
            else
                console.log("alredy exists")
        },
        repoClkd(val) {
            this.activeRepo.metadata = this.repos.filter((repo) => repo.full_name == val)[0]
            this.getRepoStuff(val)
        },
        async getRepoStuff(val) {
            const res = await Promise.all([
                fetch(`https://api.github.com/repos/${val}/branches`).then((res) => res.json()),
                fetch(`https://api.github.com/repos/${val}/issues`).then((res) => res.json())
            ])
            this.activeRepo.branches = res[0]
            this.activeRepo.issues = res[1]
        }
    },
}).mount('#app')