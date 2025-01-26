// Live Match Stats Update
class LiveMatch {
    constructor() {
        this.stats = {
            possession: { home: 60, away: 40 },
            shots: { home: 8, away: 3 },
            score: { home: 2, away: 1 },
            time: 75
        };
        
        this.updateInterval = null;
    }

    // Update match time
    updateTime() {
        this.stats.time = Math.min(90, this.stats.time + 1);
        document.querySelector('.time').textContent = `${this.stats.time}'`;
    }

    // Update possession stats
    updatePossession() {
        const change = Math.random() > 0.5 ? 1 : -1;
        this.stats.possession.home = Math.min(Math.max(this.stats.possession.home + change, 30), 70);
        this.stats.possession.away = 100 - this.stats.possession.home;

        const leftBar = document.querySelector('.stat-bar-left');
        const rightBar = document.querySelector('.stat-bar-right');
        const [leftValue, rightValue] = document.querySelectorAll('.stat-values span');

        leftBar.style.width = `${this.stats.possession.home}%`;
        rightBar.style.width = `${this.stats.possession.away}%`;
        leftValue.textContent = `${this.stats.possession.home}%`;
        rightValue.textContent = `${this.stats.possession.away}%`;
    }

    // Update shots stats
    updateShots() {
        if (Math.random() > 0.8) {
            const isHome = Math.random() > 0.5;
            if (isHome) {
                this.stats.shots.home++;
            } else {
                this.stats.shots.away++;
            }

            const shotsValues = document.querySelectorAll('.stat-values')[1].querySelectorAll('span');
            shotsValues[0].textContent = this.stats.shots.home;
            shotsValues[2].textContent = this.stats.shots.away;

            // Update shot bars
            const totalShots = this.stats.shots.home + this.stats.shots.away;
            const homeWidth = (this.stats.shots.home / totalShots) * 100;
            const awayWidth = (this.stats.shots.away / totalShots) * 100;

            const shotBars = document.querySelectorAll('.stat-bars')[1];
            shotBars.querySelector('.stat-bar-left').style.width = `${homeWidth}%`;
            shotBars.querySelector('.stat-bar-right').style.width = `${awayWidth}%`;
        }
    }

    // Update score
    updateScore() {
        if (Math.random() > 0.95) {
            const isHome = Math.random() > 0.5;
            if (isHome) {
                this.stats.score.home++;
            } else {
                this.stats.score.away++;
            }

            const [homeScore, awayScore] = document.querySelectorAll('.team-score');
            homeScore.textContent = this.stats.score.home;
            awayScore.textContent = this.stats.score.away;

            // Animate score change
            const scorer = isHome ? homeScore : awayScore;
            scorer.classList.add('score-update');
            setTimeout(() => scorer.classList.remove('score-update'), 1000);
        }
    }

    // Start live updates
    startLiveUpdates() {
        this.updateInterval = setInterval(() => {
            this.updateTime();
            this.updatePossession();
            this.updateShots();
            this.updateScore();

            // End match at 90 minutes
            if (this.stats.time >= 90) {
                this.stopLiveUpdates();
                document.querySelector('.live-indicator').innerHTML = `
                    <span class="match-ended">FULL TIME</span>
                `;
            }
        }, 3000); // Update every 3 seconds
    }

    // Stop live updates
    stopLiveUpdates() {
        if (this.updateInterval) {
            clearInterval(this.updateInterval);
            this.updateInterval = null;
        }
    }
}

// Initialize live match on page load
document.addEventListener('DOMContentLoaded', () => {
    const liveMatch = new LiveMatch();
    liveMatch.startLiveUpdates();

    // Add smooth scroll behavior for navigation
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Initialize AOS
    AOS.init({
        duration: 800,
        once: true,
        offset: 100
    });
});
