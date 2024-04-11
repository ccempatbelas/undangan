<script lang="ts">
  export let data;

  $: activities = data.activities.sort((a, b) => b.createdTime.getTime() - a.createdTime.getTime());
</script>

<table class="table table-hover table-compact">
  <thead>
    <tr>
      <th>time</th>
      <th>By</th>
      <th>log</th>
    </tr>
  </thead>
  <tbody>
    {#each activities as activity}
      <tr>
        <td class="max-w-[50px]">{activity.createdTime.toLocaleString()}</td>
        <td>{activity.by}</td>
        <td>{activity.activity}</td>
      </tr>
    {/each}
  </tbody>
</table>
