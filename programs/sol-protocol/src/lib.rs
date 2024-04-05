use anchor_lang::prelude::*;

// Your program Id will be added here when you enter "build" command
declare_id!("3Y1UEAKRVuRr4qX8KN4UxhbhaACVCyskbDushd2Ud2FY");

// owen's local program id:3Y1UEAKRVuRr4qX8KN4UxhbhaACVCyskbDushd2Ud2FY
// aron's dev net program id: 3HuN3uYw1h33gUyJwoy1vRaNLEijd782ceLQPgSCk9b4

#[error_code]
pub enum ErrorCode {
    #[msg("Already asserted")]
    AlreadyAsserted,
    NotYetAsserted,
    // Add other variants if needed
}

#[program]
pub mod sol_protocol {
    use super::*;

    pub fn propose(
        ctx: Context<Proposal>,
        id: u64,
        proposal_name: String,
        reward_amount: u64,
    ) -> Result<()> {
        let proposal_account: &mut Account<'_, ProposalAccount> =
            &mut ctx.accounts.proposal_account;

        proposal_account.id = id;
        proposal_account.proposal_name = proposal_name;
        proposal_account.reward_amount = reward_amount;
        proposal_account.owner = *ctx.accounts.authority.key;
        proposal_account.assert_at = 0;

        Ok(())
    }

    pub fn assert(ctx: Context<Assert>, id: u64, answer: bool, _proposal_id: u64) -> Result<()> {
        let proposal_account: &mut Account<'_, ProposalAccount> =
            &mut ctx.accounts.proposal_account;
        if proposal_account.assert_at != 0 {
            return Err(ErrorCode::AlreadyAsserted.into());
        }
        let assertion_account = &mut ctx.accounts.assertion_account;
        assertion_account.id = id;
        assertion_account.owner = *ctx.accounts.authority.key;
        assertion_account.proposal_key = assertion_account.key();
        assertion_account.answer = answer;
        //TODO: add real money transfer
        assertion_account.assert_amount = proposal_account.reward_amount * 100;
        assertion_account.assert_at = Clock::get()?.unix_timestamp;
        proposal_account.assert_at = assertion_account.assert_at;
        Ok(())
    }

    pub fn challenge_assert(ctx: Context<ChallengeAssert>, id: u64, _proposal_id: u64, _assert_id: u64) -> Result<()> {
        let proposal_account: &mut Account<'_, ProposalAccount> =
            &mut ctx.accounts.proposal_account;
        if proposal_account.assert_at == 0 {
            return Err(ErrorCode::NotYetAsserted.into());
        }
        let assertion_account = &mut ctx.accounts.assertion_account;
        let challenge_assertion_account = &mut ctx.accounts.challenge_assertion_account;
        challenge_assertion_account.id = id;
        challenge_assertion_account.owner = *ctx.accounts.authority.key;
        challenge_assertion_account.proposal_key = proposal_account.key();
        challenge_assertion_account.pre_assert_key = assertion_account.key();
        challenge_assertion_account.answer = !assertion_account.answer;
        //TODO: add real money transfer
        challenge_assertion_account.assert_amount = assertion_account.assert_amount * 2;
        challenge_assertion_account.assert_at = Clock::get()?.unix_timestamp;
        proposal_account.assert_at = challenge_assertion_account.assert_at;
        Ok(())
    }
}

#[derive(Accounts)]
#[instruction(id : u64)]
pub struct Proposal<'info> {
    #[account(mut)]
    pub authority: Signer<'info>,

    #[account(
        init,
        payer = authority,
        space = 8 + 8 + 32+ (4 + 12)+ 8 + 1 + 50,
        seeds = [b"proposal", authority.key().as_ref(), id.to_le_bytes().as_ref()], 
        bump
    )]
    pub proposal_account: Account<'info, ProposalAccount>,

    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
#[instruction(id : u64, answer: bool, proposal_id: u64)]
pub struct Assert<'info> {
    #[account(mut)]
    pub authority: Signer<'info>,

    #[account(
        mut,
        seeds = [b"proposal", authority.key().as_ref(), proposal_id.to_le_bytes().as_ref()], 
        bump
    )]
    pub proposal_account: Account<'info, ProposalAccount>,

    #[account(
        init,
        payer = authority,
        space = 8 + 32 + 32 + 32 + 32 + 4 + 8 + 8 + 1,
        seeds = [b"assert", authority.key().as_ref(), id.to_le_bytes().as_ref(), proposal_account.id.to_le_bytes().as_ref()], 
        bump
    )]
    pub assertion_account: Account<'info, AssertionAccount>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
#[instruction(id : u64, proposal_id: u64, assert_id: u64)]
pub struct ChallengeAssert<'info> {
    #[account(mut)]
    pub authority: Signer<'info>,

    #[account(
        mut,
        seeds = [b"proposal", authority.key().as_ref(), proposal_id.to_le_bytes().as_ref()], 
        bump
    )]
    pub proposal_account: Account<'info, ProposalAccount>,

    #[account(
        mut,
        seeds = [b"assert", authority.key().as_ref(), assert_id.to_le_bytes().as_ref(), proposal_account.id.to_le_bytes().as_ref()], 
        bump
    )]
    pub assertion_account: Account<'info, AssertionAccount>,

    #[account(
        init,
        payer = authority,
        space = 8 + 32 + 32 + 32 + 32 + 4 + 8 + 8 + 1,
        seeds = [b"assert", authority.key().as_ref(), id.to_le_bytes().as_ref(), proposal_account.id.to_le_bytes().as_ref()], 
        bump
    )]
    pub challenge_assertion_account: Account<'info, AssertionAccount>,

    pub system_program: Program<'info, System>,
}

#[account]
#[derive(Default)]
pub struct ProposalAccount {
    pub id: u64,
    pub owner: Pubkey,
    pub proposal_name: String,
    pub reward_amount: u64,
    pub assert_at: i64,
}

#[account]
#[derive(Default, Debug)]
pub struct AssertionAccount {
    pub id: u64,
    pub proposal_key: Pubkey,
    pub pre_assert_key: Pubkey,
    pub owner: Pubkey,
    pub answer: bool,
    pub assert_amount: u64,
    pub assert_at: i64,
}
