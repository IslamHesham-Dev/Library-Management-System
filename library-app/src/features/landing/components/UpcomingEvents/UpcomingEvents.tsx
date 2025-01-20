import React from 'react';

import './UpcomingEvents.css';
import { AutoAwesome } from '@mui/icons-material';

export const UpcomingEvents: React.FC = () => {
    return (
        <div className="upcoming-events">
            <div className="upcoming-events-header-group">
                <AutoAwesome
                    sx={{
                        fontSize: "2.25rem",
                        color: "#3626A7"
                    }}
                />
                <h2>Upcoming Events</h2>
                <AutoAwesome
                    sx={{
                        fontSize: "2.25rem",
                        color: "#3626A7"
                    }}
                />
            </div>
            <h3>Welcome Week Activities</h3>
            <h4>Monday's: 4:00 PM - 5:30 PM</h4>
            <ul className="upcoming-events-event">
                <li><p>Who: Children (6 to 12 years old)</p></li>
                <li><p>Activities: Storytelling Hour, Creative Arts</p></li>
            </ul>
            <h4>Tuesday's: 6:00 PM - 7:30 PM</h4>
            <ul className="upcoming-events-event">
                <li><p>Who: Teens (13 to 18 years old)</p></li>
                <li><p>Activities: Book Club for Teens, Intro to Coding</p></li>
            </ul>
            <h4>Wednesday's: 5:00 PM - 7:00 PM</h4>
            <ul className="upcoming-events-event">
                <li><p>Who: Adults (18+)</p></li>
                <li><p>Activities: Meet the Author, Historical Documentary Screening</p></li>
            </ul>
        </div>
    );
};
