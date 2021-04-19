# wPOKT App (Hooks)

**useFarmStats:** 
This hook fetches farm data from the subgraph & calculates farm stats.

```
type FarmStatsReturnType = {
  apr: BigNumber; // Annual Percentage Rate
  tvl: BigNumber;  // Total Value Locked (USD)
  maxRelays: BigNumber; // Max amount of relays that farm is subsidizing
  farmUsage: BigNumber; // Percentage based on goal relays and max relays.
  lockedRewards: BigNumber; // Locked Rewards Pool balance.
  unlockedRewards: BigNumber; // Unlocked Rewards Pool balance.
  totalStaked: BigNumber;  // Total amount of wPOKT staked.
  totalRewards: BigNumber; // lockedRewards + unlockedRewards
  totalUnlockedRewards: BigNumber; // All-time unlocked rewards (claimed too).
  rewardUnlockRate: BigNumber; // Monthly rate at which rewards unlock.
  timeLeft?: number; // Seconds left until farm ends.
  totalTime?: number; // Farm duration in seconds
};
```

**Max Relays formula** is: `TotalStaked * 40` which means `40 relays per wPOKT`.

**Farm Relay Goal** is hardcoded [here](https://github.com/pokt-network/wpokt-app/blob/master/src/hooks/useFarmStats.ts#L88) to 15 million.

**useUserStats:** 
This hook fetches user data from the subgraph & calculates user stats.

```
type UserStatsReturnType = {
  earned: BigNumber; // Amount of claimed rewards (only if user has unstaked).
  stakes: [Stake]; // Self-explanatory.
  totalStaked: BigNumber; // Total amount of tokens staked by this user.
  ownershipShare: number; // User ownership % over the unlocked pool of rewards.
  weightedMultiplier: number; // Weighted bonus multiplier for stakes.
};
```

The Ownership Share is calculated by iterating each user stakes (contained in the `stakes` array) to obtain `totalStakeShareSecs`. Read more about ownership share [here.](https://hackmd.io/yWFcrnpURoqPKFhfuxotOA)

The Weighted Multiplier is calculating each stake's multiplier and multiply it by (`stakeAmount / totalStaked`). In this case `totalStaked` is just User's total staked instead of global total staked. Read more about multiplier [here](https://www.ampltalk.org/app/forum/ampl-geyser-19/topic/about-the-geyser-21/).
