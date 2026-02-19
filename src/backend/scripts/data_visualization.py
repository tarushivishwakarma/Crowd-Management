"""
Data Visualization Scripts using Matplotlib
Generates charts and graphs for analytics
"""
import matplotlib
matplotlib.use('Agg')  # Use non-interactive backend
import matplotlib.pyplot as plt
import seaborn as sns
import pandas as pd
import numpy as np
from datetime import datetime, timedelta
from io import BytesIO
import base64

# Set style
sns.set_style("whitegrid")
plt.rcParams['figure.figsize'] = (12, 6)

def generate_crowd_heatmap(heatmap_data: dict, temple_name: str) -> str:
    """
    Generate crowd density heatmap
    
    Args:
        heatmap_data: Dictionary with hour->zone->density structure
        temple_name: Name of the temple
    
    Returns:
        Base64 encoded PNG image
    """
    # Prepare data for heatmap
    hours = sorted(heatmap_data.keys())
    zones = set()
    for hour_data in heatmap_data.values():
        zones.update(hour_data.keys())
    zones = sorted(zones)
    
    # Create matrix
    matrix = np.zeros((len(zones), len(hours)))
    
    for i, zone in enumerate(zones):
        for j, hour in enumerate(hours):
            if zone in heatmap_data[hour]:
                matrix[i][j] = heatmap_data[hour][zone]['average_density']
    
    # Create heatmap
    plt.figure(figsize=(14, 8))
    sns.heatmap(
        matrix,
        xticklabels=[f"{h}:00" for h in hours],
        yticklabels=[z.replace('_', ' ').title() for z in zones],
        cmap='YlOrRd',
        annot=True,
        fmt='.1f',
        cbar_kws={'label': 'Crowd Density (%)'}
    )
    
    plt.title(f'Crowd Density Heatmap - {temple_name}', fontsize=16, fontweight='bold')
    plt.xlabel('Hour of Day', fontsize=12)
    plt.ylabel('Zone', fontsize=12)
    plt.tight_layout()
    
    # Convert to base64
    buffer = BytesIO()
    plt.savefig(buffer, format='png', dpi=150, bbox_inches='tight')
    buffer.seek(0)
    image_base64 = base64.b64encode(buffer.read()).decode()
    plt.close()
    
    return f"data:image/png;base64,{image_base64}"

def generate_footfall_chart(footfall_data: list, temple_name: str) -> str:
    """
    Generate footfall trend chart
    
    Args:
        footfall_data: List of footfall records with date and count
        temple_name: Name of the temple
    
    Returns:
        Base64 encoded PNG image
    """
    df = pd.DataFrame(footfall_data)
    df['date'] = pd.to_datetime(df['date'])
    df = df.sort_values('date')
    
    plt.figure(figsize=(14, 6))
    
    # Plot total footfall
    daily_totals = df.groupby('date')['count'].sum()
    plt.plot(daily_totals.index, daily_totals.values, marker='o', linewidth=2, markersize=6)
    
    plt.title(f'Daily Footfall Trend - {temple_name}', fontsize=16, fontweight='bold')
    plt.xlabel('Date', fontsize=12)
    plt.ylabel('Total Visitors', fontsize=12)
    plt.grid(True, alpha=0.3)
    plt.xticks(rotation=45)
    plt.tight_layout()
    
    # Convert to base64
    buffer = BytesIO()
    plt.savefig(buffer, format='png', dpi=150, bbox_inches='tight')
    buffer.seek(0)
    image_base64 = base64.b64encode(buffer.read()).decode()
    plt.close()
    
    return f"data:image/png;base64,{image_base64}"

def generate_zone_comparison_chart(zone_data: dict, temple_name: str) -> str:
    """
    Generate zone-wise visitor comparison chart
    
    Args:
        zone_data: Dictionary with zone names and visitor counts
        temple_name: Name of the temple
    
    Returns:
        Base64 encoded PNG image
    """
    zones = list(zone_data.keys())
    counts = list(zone_data.values())
    
    plt.figure(figsize=(10, 6))
    
    # Create bar chart
    colors = sns.color_palette("husl", len(zones))
    bars = plt.bar(zones, counts, color=colors)
    
    # Add value labels on bars
    for bar in bars:
        height = bar.get_height()
        plt.text(bar.get_x() + bar.get_width()/2., height,
                f'{int(height)}',
                ha='center', va='bottom', fontsize=10)
    
    plt.title(f'Zone-wise Visitor Distribution - {temple_name}', fontsize=16, fontweight='bold')
    plt.xlabel('Zone', fontsize=12)
    plt.ylabel('Number of Visitors', fontsize=12)
    plt.xticks(rotation=45, ha='right')
    plt.tight_layout()
    
    # Convert to base64
    buffer = BytesIO()
    plt.savefig(buffer, format='png', dpi=150, bbox_inches='tight')
    buffer.seek(0)
    image_base64 = base64.b64encode(buffer.read()).decode()
    plt.close()
    
    return f"data:image/png;base64,{image_base64}"

def generate_emergency_stats_chart(emergency_stats: dict, temple_name: str) -> str:
    """
    Generate emergency statistics chart
    
    Args:
        emergency_stats: Dictionary with emergency type and count
        temple_name: Name of the temple
    
    Returns:
        Base64 encoded PNG image
    """
    types = list(emergency_stats.keys())
    counts = list(emergency_stats.values())
    
    fig, (ax1, ax2) = plt.subplots(1, 2, figsize=(14, 6))
    
    # Pie chart
    colors = sns.color_palette("Set2", len(types))
    ax1.pie(counts, labels=[t.replace('_', ' ').title() for t in types], 
            autopct='%1.1f%%', colors=colors, startangle=90)
    ax1.set_title('Emergency Distribution by Type', fontsize=14, fontweight='bold')
    
    # Bar chart
    bars = ax2.bar([t.replace('_', ' ').title() for t in types], counts, color=colors)
    ax2.set_title('Emergency Count by Type', fontsize=14, fontweight='bold')
    ax2.set_ylabel('Count', fontsize=12)
    ax2.tick_params(axis='x', rotation=45)
    
    # Add value labels
    for bar in bars:
        height = bar.get_height()
        ax2.text(bar.get_x() + bar.get_width()/2., height,
                f'{int(height)}',
                ha='center', va='bottom', fontsize=10)
    
    plt.suptitle(f'Emergency Statistics - {temple_name}', fontsize=16, fontweight='bold', y=1.02)
    plt.tight_layout()
    
    # Convert to base64
    buffer = BytesIO()
    plt.savefig(buffer, format='png', dpi=150, bbox_inches='tight')
    buffer.seek(0)
    image_base64 = base64.b64encode(buffer.read()).decode()
    plt.close()
    
    return f"data:image/png;base64,{image_base64}"

def generate_wait_time_chart(wait_time_data: list, temple_name: str) -> str:
    """
    Generate average wait time chart
    
    Args:
        wait_time_data: List with zone and average wait time
        temple_name: Name of the temple
    
    Returns:
        Base64 encoded PNG image
    """
    df = pd.DataFrame(wait_time_data)
    
    plt.figure(figsize=(10, 6))
    
    # Create horizontal bar chart
    colors = ['#ff4444' if x > 30 else '#ffaa00' if x > 15 else '#44aa44' 
              for x in df['wait_time']]
    bars = plt.barh(df['zone'], df['wait_time'], color=colors)
    
    # Add value labels
    for i, (bar, val) in enumerate(zip(bars, df['wait_time'])):
        plt.text(val + 1, i, f'{int(val)} min', 
                va='center', fontsize=10)
    
    plt.title(f'Average Wait Time by Zone - {temple_name}', fontsize=16, fontweight='bold')
    plt.xlabel('Wait Time (minutes)', fontsize=12)
    plt.ylabel('Zone', fontsize=12)
    
    # Add legend
    from matplotlib.patches import Patch
    legend_elements = [
        Patch(facecolor='#44aa44', label='Low (< 15 min)'),
        Patch(facecolor='#ffaa00', label='Moderate (15-30 min)'),
        Patch(facecolor='#ff4444', label='High (> 30 min)')
    ]
    plt.legend(handles=legend_elements, loc='lower right')
    
    plt.tight_layout()
    
    # Convert to base64
    buffer = BytesIO()
    plt.savefig(buffer, format='png', dpi=150, bbox_inches='tight')
    buffer.seek(0)
    image_base64 = base64.b64encode(buffer.read()).decode()
    plt.close()
    
    return f"data:image/png;base64,{image_base64}"

def generate_peak_hours_chart(hourly_data: dict, temple_name: str) -> str:
    """
    Generate peak hours analysis chart
    
    Args:
        hourly_data: Dictionary with hour and visitor count
        temple_name: Name of the temple
    
    Returns:
        Base64 encoded PNG image
    """
    hours = sorted(hourly_data.keys())
    counts = [hourly_data[h] for h in hours]
    
    plt.figure(figsize=(14, 6))
    
    # Create area chart
    plt.fill_between(hours, counts, alpha=0.3, color='#6366f1')
    plt.plot(hours, counts, marker='o', linewidth=2, markersize=6, color='#6366f1')
    
    # Highlight peak hours
    peak_hour = hours[counts.index(max(counts))]
    plt.axvline(x=peak_hour, color='red', linestyle='--', linewidth=2, label=f'Peak: {peak_hour}:00')
    
    plt.title(f'Hourly Visitor Pattern - {temple_name}', fontsize=16, fontweight='bold')
    plt.xlabel('Hour of Day', fontsize=12)
    plt.ylabel('Number of Visitors', fontsize=12)
    plt.xticks(hours, [f'{h}:00' for h in hours], rotation=45)
    plt.grid(True, alpha=0.3)
    plt.legend()
    plt.tight_layout()
    
    # Convert to base64
    buffer = BytesIO()
    plt.savefig(buffer, format='png', dpi=150, bbox_inches='tight')
    buffer.seek(0)
    image_base64 = base64.b64encode(buffer.read()).decode()
    plt.close()
    
    return f"data:image/png;base64,{image_base64}"

# Example usage
if __name__ == "__main__":
    # Example data
    heatmap_data = {
        6: {"mainDarshan": {"average_density": 45}, "garbhaGriha": {"average_density": 60}},
        7: {"mainDarshan": {"average_density": 55}, "garbhaGriha": {"average_density": 70}},
        8: {"mainDarshan": {"average_density": 75}, "garbhaGriha": {"average_density": 85}},
    }
    
    print("Generating sample charts...")
    chart1 = generate_crowd_heatmap(heatmap_data, "Somnath Temple")
    print("✓ Crowd heatmap generated")
    
    print("\nAll visualization functions ready for use!")