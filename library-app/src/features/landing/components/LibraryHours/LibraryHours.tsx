import React from 'react';
import './LibraryHours.css';

export const LibraryHours: React.FC = () => {
    return (
        <div className="library-hours">
            <h3>Library Hours</h3>
            <table className="library-hours-table" id="hours">
                <tbody>
                    <tr>
                        <td>Saturday</td>
                        <td>10:00 AM - 6:00 PM</td>
                    </tr>
                    <tr>
                        <td>Sunday</td>
                        <td>8:30 AM - 8:00 PM</td>
                    </tr>
                    <tr>
                        <td>Monday</td>
                        <td>8:30 AM - 8:00 PM</td>
                    </tr>
                    <tr>
                        <td>Tuesday</td>
                        <td>8:30 AM - 8:00 PM</td>
                    </tr>
                    <tr>
                        <td>Wednesday</td>
                        <td>8:30 AM - 8:00 PM</td>
                    </tr>
                    <tr>
                        <td>Thursday</td>
                        <td>8:30 AM - 8:00 PM</td>
                    </tr>
                    <tr>
                        <td>Friday</td>
                        <td>Closed</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};
